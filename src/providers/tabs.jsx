import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import useLocalStorage from "use-local-storage";
import getCurrentTabIndex from "../utils/get-current-tab-index";

/**
 * @typedef {Object} Tab
 * @property {string} url - The URL of the tab.
 * @property {string} title - The title of the tab.
 * @property {string} icon - The icon URL of the tab.
 * @property {number} id - A unique identifier for the tab.
 */

/**
 * @typedef {Object} TabsContextType
 * @property {Tab[]} tabs - Array of tab objects.
 * @property {(newTab: Tab, index?: number) => void} addTab - Function to add a new tab.
 * @property {(id: number) => void} removeTab - Function to remove a tab by its ID.
 * @property {(id: number, updatedTab: Partial<Tab>) => void} updateTab - Function to update a tab by its ID.
 * @property {React.MutableRefObject<HTMLDivElement | null>} webviews - Reference to the webviews div element.
 * @property {number} currentTabIndex - The index of the current tab.
 * @property {(index: number) => void} setCurrentTabIndex - Function to update the current tab index.
 */

const TabsContext = createContext(null);

const defaultTabs = [
    {
        url: "https://manuelwestermeier.github.io/fsRch/",
        title: "fsRch | Search",
        icon: "https://manuelwestermeier.github.io/fsRch/logo.png",
        id: Math.random(),
    },
    {
        url: "https://google.com/",
        title: "Google",
        icon: "https://manuelwestermeier.github.io/fsRch/logo.png",
        id: Math.random(),
    },
];

export const TabsProvider = ({ children }) => {
    const webviews = useRef(null);
    const [tabs, setTabs] = useState(defaultTabs);
    const [currentTabIndex, setCurrentTabIndex] = useLocalStorage("mw-b-tab-index", 0);

    useEffect(() => {
        const handleScroll = () => webviews.current && setCurrentTabIndex(getCurrentTabIndex(webviews.current));
        const webviewsContainer = webviews.current;

        if (webviewsContainer) {
            webviewsContainer.onscroll = handleScroll;
        }

        return () => {
            if (webviewsContainer) {
                webviewsContainer.onscroll = null;
            }
        };
    }, [webviews, setCurrentTabIndex]);

    useEffect(() => {
        if (webviews.current && webviews.current[currentTabIndex]) {
            webviews.current[currentTabIndex].scrollIntoView({ block: "center", behavior: "smooth" });
        }
    }, [currentTabIndex, webviews]);

    const addTab = (newTab, index) => {
        setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            if (typeof index === "number") {
                updatedTabs.splice(index, 0, newTab);
            } else {
                updatedTabs.push(newTab);
            }
            return updatedTabs;
        });
    };

    const removeTab = (id) => {
        setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
    };

    const updateTab = (id, updatedTab) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) => (tab.id === id ? { ...tab, ...updatedTab } : tab))
        );
    };

    return (
        <TabsContext.Provider value={{ tabs, addTab, removeTab, updateTab, webviews, currentTabIndex, setCurrentTabIndex }}>
            {children}
        </TabsContext.Provider>
    );
};

/**
 * 
 * @returns {TabsContextType}
 */
export const useTabs = () => {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error("useTabs must be used within a TabsProvider");
    }

    return context;
};