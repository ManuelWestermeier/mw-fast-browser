import { useTabsVisibility } from '../../providers/show-tab-bar';
import { useTabs } from '../../providers/tabs';
const { ipcRenderer } = require("electron")
import React, { useEffect } from 'react';
import Header from '../header';
import Tab from '../tab';
import "./index.css";

export default function Tabs() {
    const { tabs, currentTabIndex, addTab, setCurrentTabIndex, removeTab, updateTab, webviews } = useTabs();
    const { tabsElemRef, toggleTabBarVisibility } = useTabsVisibility();

    ipcRenderer.on("KeyDown::Control+Tab", () => toggleTabBarVisibility())
    ipcRenderer.on("KeyDown::Left", () => setCurrentTabIndex(Math.max(currentTabIndex - 1, 0)))
    ipcRenderer.on("KeyDown::Right", () => setCurrentTabIndex(Math.min(currentTabIndex + 1, tabs.length)))

    useEffect(() => {
        const clearCallbacks = tabs.map((tab, index) => {
            const webview = webviews[index]; // Access webview from the `webviews` array
            if (!webview) return null;

            const updateTabInfo = async () => {
                try {
                    const title = webview.getTitle();
                    const url = webview.getURL();
                    const icon = await webview.executeJavaScript(
                        `document.querySelector('link[rel~="icon"]')?.href || ''`
                    );
                    updateTab(tab.id, { title, url, icon });
                } catch (error) {
                    console.error("Failed to update tab info:", error);
                }
            };

            // Attach event listeners
            webview.addEventListener('did-finish-load', updateTabInfo);
            webview.addEventListener('page-title-updated', updateTabInfo);
            webview.addEventListener('did-navigate', updateTabInfo);
            webview.addEventListener('did-navigate-in-page', updateTabInfo);

            return () => {
                // Cleanup listeners
                webview.removeEventListener('did-finish-load', updateTabInfo);
                webview.removeEventListener('page-title-updated', updateTabInfo);
                webview.removeEventListener('did-navigate', updateTabInfo);
                webview.removeEventListener('did-navigate-in-page', updateTabInfo);
            };
        });

        return () => {
            clearCallbacks.forEach(clearCb => clearCb?.());
        };
    }, [tabs, webviews]);

    return (
        <div ref={tabsElemRef} className="tabs full-screen fixed-t-l">
            <Header
                addNewTab={(value) => {
                    addTab({ icon: "", id: Math.random(), title: value, url: value });
                }}
            />
            <div className='tabs-view'>
                {tabs.map((tab, index) => {
                    const active = currentTabIndex === index;
                    return <Tab
                        removeTab={removeTab}
                        setCurrentTabIndex={setCurrentTabIndex}
                        toggleTabBarVisibility={toggleTabBarVisibility}
                        active={active} index={index} tab={tab} key={tab.id}
                    />
                })}
            </div>
        </div>
    );
}