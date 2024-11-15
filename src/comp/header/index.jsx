import React, { useState } from 'react';
import "./index.css";
import { NavLink } from 'react-router-dom';
import toUrl from '../../utils/get-url';

const navLinks = [
    { title: "Settings", url: "/settings" },
    { title: "Theme", url: "/theme" }
];

export default function Header({ addNewTab }) {
    const [showNewTabInput, setShowNewTabInput] = useState(false);

    const handleInputSubmit = (value) => {
        if (value.trim()) {
            setShowNewTabInput(false);
            addNewTab(toUrl(value));
        }
    };

    return (
        <header className="tabs-header">
            <div className="links">
                {navLinks.map((navLink, index) => (
                    <NavLink key={index} to={navLink.url} title={navLink.title}>
                        {navLink.title}
                    </NavLink>
                ))}
            </div>
            <div className="add-tab">
                {showNewTabInput ? (
                    <>
                        <input
                            type="text"
                            placeholder="url/search..."
                            autoFocus
                            onInput={e => {
                                e.target
                                e.target.type = false ? "" : ""
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleInputSubmit(e.target.value);
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                handleInputSubmit(document.querySelector('.add-tab input').value)
                            }}
                        >
                            +
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowNewTabInput((prev) => !prev)}
                    >
                        New Tab
                    </button>
                )}
            </div>
        </header>
    );
}