import { useTabsVisibility } from '../../providers/show-tab-bar'
import { useTabs } from '../../providers/tabs'
import "../../css/tabs.css"
import React from 'react'

export default function Tabs() {
    const { tabs, currentTabIndex } = useTabs()
    const { tabsElemRef } = useTabsVisibility()

    return (
        <div ref={tabsElemRef} className='tabs full-screen fixed-t-l'>
            <button>
                +
            </button>
            <div>
                {tabs.map((tab, index) => {
                    const active = currentTabIndex == index
                    return <div className={"tab flex" + (active ? " current" : "")}>
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