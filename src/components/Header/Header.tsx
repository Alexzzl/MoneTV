import { useLocation, useNavigate } from 'react-router-dom'
import Remote from '../../remote'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isPlayer = location.pathname === '/player' || location.pathname.startsWith('/player/')

  const handleBack = () => {
    Remote.goBack()
  }

  const handleLogoClick = () => {
    navigate('/home')
  }

  const navItems = [
    { page: 'home', label: 'Home', icon: 'fas fa-home' },
    { page: 'discover', label: 'Discover', icon: 'fas fa-compass' },
    { page: 'settings', label: 'Categories', icon: 'fas fa-th-large' },
  ]

  const currentPage = location.pathname.replace('/', '') || 'home'

  return (
    <header className="page-header" id="main-header">
      <div
        className="logo-container"
        style={{ display: isPlayer ? 'none' : 'flex' }}
        onClick={handleLogoClick}
        data-focusable="true"
      >
        <img
          src="assets/CodeBubbyAssets/screenshot_3099_681.png"
          alt="Mone TV Logo"
          className="logo-icon"
        />
        <h1 className="logo-text">Mone TV</h1>
      </div>

      <button
        className="back-button header-back-button"
        id="header-back-button"
        style={{ display: isPlayer ? 'flex' : 'none' }}
        onClick={handleBack}
        data-focusable="true"
      >
        <i className="fas fa-arrow-left" />
        <span>Back</span>
      </button>

      <nav className="main-nav" id="main-nav">
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li
              key={item.page}
              className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
              data-page={item.page}
              data-focusable="true"
              onClick={() => navigate(`/${item.page}`)}
            >
              <i className={`nav-icon ${item.icon}`} />
              <span className="nav-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-actions">
        <button className="header-btn search-btn" data-focusable="true">
          <i className="fas fa-search" />
        </button>
        <button className="header-btn profile-btn" data-focusable="true">
          <i className="fas fa-user" />
        </button>
      </div>
    </header>
  )
}
