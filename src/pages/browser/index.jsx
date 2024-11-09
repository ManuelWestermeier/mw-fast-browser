import React from 'react'
import BrowserViews from '../../comp/browser-view'
import { TabsProvider } from '../../providers/tabs'
import Tabs from '../../comp/tabs'

export default function Browser() {
    return <TabsProvider>
        <BrowserViews />
        <Tabs />
    </TabsProvider>
}