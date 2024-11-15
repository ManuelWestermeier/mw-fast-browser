const { ipcRenderer } = require("electron")
import React, { useEffect, useRef } from 'react'

export default function Tab({ active, tab, index, toggleTabBarVisibility, setCurrentTabIndex, removeTab }) {
    const tabElemRef = useRef()

    if (active)
        ipcRenderer.on("KeyDown::Control+W", () => removeTab(tab.id))

    useEffect(() => {
        if (active && tabElemRef.current)
            tabElemRef.current.focus()
    }, [tabElemRef])

    return (
        <div
            ref={tabElemRef}
            autoFocus={active}
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
            tabIndex={active ? "-1" : "1"}
            onClick={() => {
                setCurrentTabIndex(index);
                toggleTabBarVisibility?.();
            }}
            className={`tab flex${active ? " current" : ""}`}
        >
            <input
                type="text"
                placeholder={tab.url}
                defaultValue={tab.url}
                onClick={(e) => e.preventDefault()}
                onBlur={(e) => e.target.value.trim() != tab.url && updateTab(tab.id, { url: e.target.value })}
            />
            <span>{tab.title || tab.url}</span>
            <button
                className="flex"
                onClick={(e) => {
                    e.preventDefault();
                    removeTab(tab.id);
                }}
            >
                x
            </button>
        </div>
    );
}
