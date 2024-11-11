import { useTabs } from '../../providers/tabs'
import "../../css/web-views.css"
import React from 'react'

export default function BrowserViews() {
    const { tabs, webviews } = useTabs()

    return (
        <div ref={webviews} className='full-screen web-views '>
            {tabs.map((tab) => {
                return <webview src={tab.url} key={tab.id} className='full-screen'>

                </webview>
            })}
        </div>
    )
}