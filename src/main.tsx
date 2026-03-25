import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/common.css'
import './styles/page-header.css'
import './styles/home.css'
import './styles/discover.css'
import './styles/detail.css'
import './styles/player.css'
import './styles/settings.css'

function adjustZoom() {
  const ratio = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
  document.body.style.transform = `scale(${ratio})`
  document.body.style.transformOrigin = 'top left'
  document.body.style.width = `${(1 / ratio) * 100}%`
  document.body.style.height = `${(1 / ratio) * 100}vh`
}

window.addEventListener('resize', adjustZoom)
adjustZoom()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
