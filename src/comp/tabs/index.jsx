import { useTabsVisibility } from '../../providers/show-tab-bar'
import { useTabs } from '../../providers/tabs'
import "../../css/tabs.css"
import React from 'react'

export default function Tabs() {
    const { tabs, currentTabIndex, addTab, setCurrentTabIndex } = useTabs()
    const { tabsElemRef } = useTabsVisibility()

    return (
        <div ref={tabsElemRef} className='tabs full-screen fixed-t-l'>
            <button onClick={() => addTab({})}>
                +
            </button>
            <div>
                {tabs.map((tab, index) => {
                    const active = currentTabIndex == index
                    return <div onKeyDown={e => {
                        if (e.key == "ArrowUp") {
                            const nextElem = e.target.parentElement.children[index - 1]
                            if (!nextElem) return
                            nextElem.focus()
                            nextElem.scrollIntoView({ behavour: "smooth", block: "center" })
                        }
                        else if (e.key == "ArrowDown") {
                            const nextElem = e.target.parentElement.children[index + 1]
                            if (!nextElem) return
                            nextElem.focus()
                            nextElem.scrollIntoView({ behavour: "smooth", block: "center" })
                        }
                        else if (e.key == "Enter") {
                            setCurrentTabIndex(index)
                        }
                    }} onClick={() => setCurrentTabIndex(index)} tabIndex="-1" key={tab.id} className={"tab flex" + (active ? " current" : "")}>
                        <input type="text" placeholder={tab.url} defaultValue={tab.url} />
                        <span>
                            {tab.title || tab.url}
                        </span>
                        <button className='flex'>
                            x
                        </button>
                    </div>
                })}
            </div>
        </div>
    )
}