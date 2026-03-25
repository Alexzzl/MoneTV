import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRemoteInit } from './hooks/useRemote'
import Header from './components/Header/Header'
import ExitDialog from './components/ExitDialog/ExitDialog'
import Home from './pages/Home/Home'
import Discover from './pages/Discover/Discover'
import Detail from './pages/Detail/Detail'
import Player from './pages/Player/Player'
import Settings from './pages/Settings/Settings'
import Remote from './remote'

function AppInner() {
  const [showLoading, setShowLoading] = useState(true)
  const [exitDialogVisible, setExitDialogVisible] = useState(false)

  useRemoteInit()

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleBack = () => {
      setExitDialogVisible((prev) => {
        if (prev) {
          // dialog already open, close it
          return false
        }
        // check if on home page
        const hash = window.location.hash
        if (hash === '#/' || hash === '#/home' || hash === '' || hash === '#') {
          return true
        }
        window.history.back()
        return false
      })
    }

    document.addEventListener('remote-back', handleBack)
    return () => document.removeEventListener('remote-back', handleBack)
  }, [])

  useEffect(() => {
    if (exitDialogVisible) {
      setTimeout(() => {
        const cancelBtn = document.getElementById('exit-confirm-cancel')
        if (cancelBtn) {
          Remote.scanFocusableElements()
          Remote.setFocus(cancelBtn)
        }
      }, 0)
    }
  }, [exitDialogVisible])

  return (
    <>
      {showLoading && (
        <div id="loading-page" className="page active">
          <img
            src="assets/CodeBubbyAssets/screenshot_3099_2157.png"
            alt="Mone TV Loading Logo"
            className="loading-logo"
          />
        </div>
      )}
      <div id="app" className="app-container" style={{ display: showLoading ? 'none' : 'flex' }}>
        <Header />
        <div id="page-container" className="page-container">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/detail/:dramaId" element={<Detail />} />
            <Route path="/player/:dramaId/:episodeId" element={<Player />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <footer id="app-footer" className="app-footer" />
        <ExitDialog
          visible={exitDialogVisible}
          onCancel={() => setExitDialogVisible(false)}
          onConfirm={() => Remote.exitApp()}
        />
      </div>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  )
}
