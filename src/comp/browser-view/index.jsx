import { useTabs } from '../../providers/tabs'
import React from 'react'
import "./index.css"

export default function BrowserViews() {
    const { tabs, webviews } = useTabs()

    return (
        <div ref={webviews} className='full-screen web-views '>
            {tabs.map((tab) => {
                return <webview allowpopups="true" src={tab.url} key={tab.id} className='full-screen'>

                </webview>
            })}
        </div>
    )
}