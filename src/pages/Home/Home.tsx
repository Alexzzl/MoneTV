import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageFocus } from '../../hooks/usePageFocus'
import MockData from '../../data/mock'
import type { Drama } from '../../types'

function SeriesCard({ drama, onClick }: { drama: Drama; onClick: () => void }) {
  const meta = drama.seasons ? `${drama.seasons} Seasons` : `${(drama as any).episodes} episodes`
  return (
    <div className="series-card" data-drama-id={drama.id} data-focusable="true" onClick={onClick}>
      <div className="series-card-poster">
        <img
          src={drama.image}
          alt={drama.title}
          onError={(e) => { (e.target as HTMLImageElement).src = 'assets/CodeBubbyAssets/3052_654/2.png' }}
        />
        <div className="series-card-play-button" />
      </div>
      <div className="series-card-content">
        <h3 className="series-card-title">{drama.title}</h3>
        <p className="series-card-description">{drama.description}</p>
        <div className="series-card-meta">{drama.categoryName} &bull; {meta}</div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  usePageFocus('home')

  const heroData = useMemo(() => {
    const dramas = MockData.dramas
    return dramas[Math.floor(Math.random() * dramas.length)]
  }, [])

  const popularDramas = useMemo(() => MockData.getPopularDramas(), [])
  const recentlyAdded = useMemo(() => MockData.getRecentlyAdded(), [])

  return (
    <div id="home-page" className="page active">
      <section id="home-hero-section" className="home-hero-section">
        {heroData && (
          <>
            <div className="hero-poster-container">
              <img src={heroData.image} alt={heroData.title} />
            </div>
            <div className="hero-details-container">
              <h1 className="hero-title">{heroData.title}</h1>
              <div className="hero-meta">
                <div className="hero-meta-item"><i className="icon" /> <span>{heroData.seasons} Seasons</span></div>
                <div className="hero-meta-item"><i className="icon" /> <span>{heroData.duration} min episodes</span></div>
                <div className="hero-meta-item"><i className="icon" /> <span>{heroData.rating} Rating</span></div>
              </div>
              <p className="hero-description">{heroData.description}</p>
              <div className="hero-actions">
                <button className="btn btn-primary" data-focusable="true" onClick={() => navigate(`/detail/${heroData.id}`)}>
                  <i className="icon" /> Watch Now
                </button>
                <button className="btn btn-secondary" data-focusable="true">
                  <i className="icon">+</i> Add to Watchlist
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      <section id="popular-series" className="home-section">
        <h2 className="home-section-title">Popular Series</h2>
        <div className="horizontal-scroll-container">
          {popularDramas.map((drama) => (
            <SeriesCard key={drama.id} drama={drama} onClick={() => navigate(`/detail/${drama.id}`)} />
          ))}
        </div>
      </section>

      <section id="recently-added" className="home-section">
        <h2 className="home-section-title">Recently Added</h2>
        <div className="horizontal-scroll-container">
          {recentlyAdded.length > 0 ? recentlyAdded.map((drama) => (
            <SeriesCard key={drama.id} drama={drama} onClick={() => navigate(`/detail/${drama.id}`)} />
          )) : (
            <p style={{ color: 'var(--text-muted)', padding: '20px' }}>No recently added dramas.</p>
          )}
        </div>
      </section>
    </div>
  )
}
