import React, { createContext, useContext } from "react";
import useLocalStorage from "use-local-storage";

// Create a context for Tabs
const TabsContext = createContext();

// Default tabs structure
const defaultTabs = [
    { url: "https://manuelwestermeier.github.io/fsRch/", title: "fsRch | Search", icon: "https://manuelwestermeier.github.io/fsRch/logo.png" },
];

// TabsProvider Component
export const TabsProvider = ({ children }) => {
    const [tabs, setTabs] = useLocalStorage("mw-b-tabs", defaultTabs);

    // Function to add a tab
    const addTab = (newTab) => {
        setTabs((prevTabs) => [...prevTabs, newTab]);
    };

    // Function to remove a tab by URL
    const removeTab = (url) => {
        if (typeof url == "string")
            setTabs((prevTabs) => prevTabs.filter((tab) => tab.url !== url));
        else if (typeof url == "number")
            setTabs((prevTabs) => prevTabs.filter((_, index) => index !== url));
    };

    // Function to update a tab by URL
    const updateTab = (url, updatedTab) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) => (tab.url === url ? { ...tab, ...updatedTab } : tab))
        );
    };

    return (
        <TabsContext.Provider value={{ tabs, addTab, removeTab, updateTab }}>
            {children}
        </TabsContext.Provider>
    );
};

// Custom hook to use the Tabs context
export const useTabs = () => {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error("useTabs must be used within a TabsProvider");
    }

    //for autocomplete
    const { tabs, addTab, removeTab, updateTab } = context
    return { tabs, addTab, removeTab, updateTab };
};