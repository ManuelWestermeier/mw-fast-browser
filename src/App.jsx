import { Route, Routes } from 'react-router-dom'
import Browser from './pages/browser'
import Page from './comp/page'
import React from 'react'

export default function App() {
  return <>
    <Browser />
    <Routes>
      {/* routes */}
      <Route element={<Page header='Settings'>Coming soon</Page>} path='/settings' />
      <Route element={<Page header='Theme'>Coming soon</Page>} path='/theme' />
    </Routes>
  </>
}