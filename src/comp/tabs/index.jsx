import { useTabsVisibility } from '../../providers/show-tab-bar'
import { useTabs } from '../../providers/tabs'
import "../../css/tabs.css"
import React from 'react'

export default function Tabs() {
    const { tabs, currentTabIndex } = useTabs()
    const { tabsElemRef } = useTabsVisibility()

    return (
        <div ref={tabsElemRef} className='tabs full-screen flex fixed-t-l'>
            <div>
                {tabs.map((tab, index) => {
                    <div className={"tab" + currentTabIndex == index ? " current" : ""}>
                        <span>
                            {tab.title || tab.url}
                        </span>
                        <button>
                            x
                        </button>
                    </div>
                })}
            </div>
            <button>
                +
            </button>
        </div>
    )
}