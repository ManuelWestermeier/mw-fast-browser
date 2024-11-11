import React from 'react'
import BrowserViews from '../../comp/browser-view'
import { TabsProvider } from '../../providers/tabs'
import Tabs from '../../comp/tabs'
import { TabsVisibilityProvider } from '../../providers/show-tab-bar'

export default function Browser() {
    return <TabsProvider>
        <TabsVisibilityProvider>
            <BrowserViews />
            <Tabs />
        </TabsVisibilityProvider>
    </TabsProvider>
}