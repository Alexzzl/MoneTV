import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageFocus } from '../../hooks/usePageFocus'
import MockData from '../../data/mock'

const GENRES = ['All Genres', 'Romance', 'Drama', 'Thriller', 'Comedy', 'Fantasy', 'Sci-Fi']

export default function Discover() {
  const navigate = useNavigate()
  const [activeGenre, setActiveGenre] = useState('All Genres')
  usePageFocus('discover')

  const trendingDramas = useMemo(() => MockData.getTrendingDramas(), [])
  const categories = useMemo(() => MockData.getCategoriesWithStats(), [])
  const newThisWeek = useMemo(() => MockData.getNewThisWeek(), [])

  return (
    <div id="discover-page" className="page active">
      <div className="discover-container">
        <div className="genre-filters" id="genre-filters">
          {GENRES.map((genre) => (
            <button
              key={genre}
              className={`btn ${activeGenre === genre ? 'active' : ''}`}
              data-focusable="true"
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <section className="discover-section">
          <h2 className="discover-section-title">
            <i className="icon fas fa-fire" /> Trending Now
          </h2>
          <div className="trending-now-container" id="trending-now-container">
            {trendingDramas.map((drama) => (
              <div
                key={drama.id}
                className="trending-card"
                data-drama-id={drama.id}
                data-focusable="true"
                onClick={() => navigate(`/detail/${drama.id}`)}
              >
                <div className="trending-card-poster" style={{ backgroundImage: `url('${drama.image}')` }}>
                  {drama.badge && <div className="trending-card-badge">{drama.badge}</div>}
                </div>
                <div className="trending-card-content">
                  <h3 className="trending-card-title">{drama.title}</h3>
                  <p className="trending-card-description">{drama.description}</p>
                  <div className="trending-card-meta">
                    <span className="trending-card-tags">{drama.tags.join(' • ')}</span>
                    <div className="trending-card-rating">
                      <i className="icon" />
                      <span>{drama.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="discover-section">
          <h2 className="discover-section-title">
            <i className="icon fas fa-th-large" /> Browse by Genre
          </h2>
          <div className="browse-by-genre-container categories-grid" id="browse-by-genre-container">
            {categories.map((category) => (
              <div
                key={category.id}
                className="genre-card"
                data-category-id={category.id}
                data-focusable="true"
              >
                <div className="genre-card-header">
                  <div className="genre-card-icon-title">
                    <div className="genre-card-icon">{category.icon}</div>
                    <h3 className="genre-card-title">{category.name}</h3>
                  </div>
                  <span className="genre-card-count">{category.seriesCount} Series</span>
                </div>
                <p className="genre-card-description">{category.description}</p>
                <div className="genre-card-tags">
                  {category.subgenres.map((tag) => (
                    <div key={tag} className="genre-card-tag">{tag}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {newThisWeek.length > 0 && (
          <section className="discover-section" id="new-this-week-section">
            <h2 className="discover-section-title">
              <i className="icon fas fa-bolt" /> New This Week
            </h2>
            <div className="new-this-week-grid">
              {newThisWeek.map((drama) => (
                <div
                  key={drama.id}
                  className="new-drama-card-v2"
                  data-drama-id={drama.id}
                  data-focusable="true"
                  onClick={() => navigate(`/detail/${drama.id}`)}
                >
                  <div className="new-drama-card-v2-icon">{drama.cardIcon}</div>
                  <div className="new-drama-card-v2-badge">{drama.badge}</div>
                  <div className="new-drama-card-v2-content">
                    <h3 className="new-drama-card-v2-title">{drama.title}</h3>
                    <p className="new-drama-card-v2-description">{drama.description}</p>
                  </div>
                  <div className="new-drama-card-v2-play-icon" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
