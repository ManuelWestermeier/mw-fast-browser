import { useTabsVisibility } from '../../providers/show-tab-bar';
import React, { useEffect, useRef } from 'react';
import { useTabs } from '../../providers/tabs';
import Header from '../header';
import "./index.css";

export default function Tabs() {
    const { tabs, currentTabIndex, addTab, setCurrentTabIndex, removeTab, updateTab } = useTabs();
    const { tabsElemRef, toggleTabBarVisibility } = useTabsVisibility();
    const webviewsRef = useRef([]);

    useEffect(() => {
        // Attach listeners to webview elements when tabs change
        return () => tabs.map((tab, index) => {
            const webview = webviewsRef.current[index];
            if (!webview) return;

            const updateTabInfo = async () => {
                const title = webview.getTitle();
                const url = webview.getURL();
                const icon = await webview.executeJavaScript(
                    `document.querySelector('link[rel~="icon"]')?.href || ''`
                );

                updateTab(tab.id, { title, url, icon });
            };

            // Attach event listeners
            webview.addEventListener('did-finish-load', updateTabInfo);
            webview.addEventListener('page-title-updated', updateTabInfo);
            webview.addEventListener('did-navigate', updateTabInfo);
            webview.addEventListener('did-navigate-in-page', updateTabInfo);

            return () => {
                // Cleanup listeners when component unmounts or tabs change
                webview.removeEventListener('did-finish-load', updateTabInfo);
                webview.removeEventListener('page-title-updated', updateTabInfo);
                webview.removeEventListener('did-navigate', updateTabInfo);
                webview.removeEventListener('did-navigate-in-page', updateTabInfo);
            };
        }).forEach(clearCb => clearCb());
    }, [tabs]);

    return (
        <div ref={tabsElemRef} className="tabs full-screen fixed-t-l">
            <Header
                addNewTab={(value) => {
                    addTab({ icon: "", id: Math.random(), title: value, url: value });
                }}
            />
            <div>
                {tabs.map((tab, index) => {
                    const active = currentTabIndex === index;
                    return (
                        <div
                            onKeyDown={(e) => {
                                if (e.key === "ArrowUp") {
                                    const nextElem = e.target.parentElement.children[index - 1];
                                    if (!nextElem) return;
                                    nextElem.focus();
                                    nextElem.scrollIntoView({ behavior: "smooth", block: "center" });
                                } else if (e.key === "ArrowDown") {
                                    const nextElem = e.target.parentElement.children[index + 1];
                                    if (!nextElem) return;
                                    nextElem.focus();
                                    nextElem.scrollIntoView({ behavior: "smooth", block: "center" });
                                } else if (e.key === "Enter") {
                                    setCurrentTabIndex(index);
                                    toggleTabBarVisibility()
                                }
                            }}
                            onClick={() => {
                                setCurrentTabIndex(index);
                                toggleTabBarVisibility()
                            }}
                            tabIndex="-1"
                            key={tab.id}
                            className={`tab flex${active ? " current" : ""}`}
                        >
                            <input
                                type="text"
                                placeholder={tab.url}
                                defaultValue={tab.url}
                                onChange={(e) => updateTab(tab.id, { url: e.target.value })}
                            />
                            <span>{tab.title || tab.url}</span>
                            <webview
                                ref={(el) => (webviewsRef.current[index] = el)}
                                src={tab.url}
                                style={{ width: 0, height: 0, display: 'none' }}
                            />
                            <button className="flex" onClick={() => removeTab(tab.id)}>
                                x
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}