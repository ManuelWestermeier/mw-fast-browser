const { ipcRenderer } = require("electron")

import React, { createContext, useContext, useRef, useState, useEffect } from "react";

// Create context for tab visibility state
const TabsVisibilityContext = createContext(null);

/**
 * TabsVisibilityProvider component that provides visibility state and a reference to the tab element.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 */
export const TabsVisibilityProvider = ({ children }) => {
    /**
     * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
     * State to manage the visibility of the tab bar
     */
    const [showTabBar, setShowTabBar] = useState(false);

    /**
     * @type {React.RefObject<HTMLDivElement>}
     * Reference for the tab bar element
     */
    const tabsElemRef = useRef(null);

    /**
     * Toggle the visibility of the tab bar
     */
    const toggleTabBarVisibility = () => setShowTabBar((prev) => !prev);

    // Update the tab bar element class based on showTabBar
    useEffect(() => {
        if (tabsElemRef.current) {
            if (showTabBar) {
                tabsElemRef.current.classList.add("can-see");
            } else {
                tabsElemRef.current.classList.remove("can-see");
            }
        }
    }, [showTabBar]);

    ipcRenderer.on('KeyDown::Control+Tab', () => toggleTabBarVisibility())

    return (
        <TabsVisibilityContext.Provider value={{ showTabBar, setShowTabBar, toggleTabBarVisibility, tabsElemRef }}>
            {children}
        </TabsVisibilityContext.Provider>
    );

};

/**
 * Custom hook to use the TabsVisibility context
 * @returns {{ showTabBar: boolean, setShowTabBar: React.Dispatch<React.SetStateAction<boolean>>, toggleTabBarVisibility: () => void, tabsElemRef: React.RefObject<HTMLDivElement> }}
 */
export const useTabsVisibility = () => {
    const context = useContext(TabsVisibilityContext);
    if (!context) {
        throw new Error("useTabsVisibility must be used within a TabsVisibilityProvider");
    }
    return context;
};