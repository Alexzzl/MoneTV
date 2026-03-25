import { useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePageFocus } from '../../hooks/usePageFocus'
import MockData from '../../data/mock'
import type { Drama, Episode } from '../../types'

function EpisodeCard({
  drama,
  episode,
  isActive,
  onClick,
}: {
  drama: Drama
  episode: Episode
  isActive: boolean
  onClick: () => void
}) {
  return (
    <div
      className="episode-card"
      data-drama-id={drama.id}
      data-episode-id={episode.id}
      data-focusable="true"
      onClick={onClick}
      style={{ opacity: episode.locked ? 0.5 : 1 }}
    >
      <div className="episode-thumbnail">
        <img src={episode.thumbnail} alt={episode.title} />
        <div className="episode-duration">{episode.duration}</div>
        {episode.locked ? (
          <div className="episode-lock-icon">
            <i className="fas fa-lock" />
          </div>
        ) : (
          <div className="episode-play-icon-small">
            <i className="fas fa-play" />
          </div>
        )}
      </div>
      <div className="episode-content">
        <h3 className="episode-title">Episode {episode.id}: {episode.title}</h3>
        <p className="episode-description">{episode.description}</p>
        <span className="episode-added-date">Added: {episode.added}</span>
      </div>
    </div>
  )
}

function MoreLikeThisCard({
  drama,
  onClick,
}: {
  drama: Drama
  onClick: () => void
}) {
  return (
    <div
      className="more-like-this-card"
      data-drama-id={drama.id}
      data-focusable="true"
      onClick={onClick}
    >
      <div className="more-like-this-poster">
        <img src={drama.image} alt={drama.title} />
      </div>
      <div className="more-like-this-content">
        <h4 className="more-like-this-title">{drama.title}</h4>
        <p className="more-like-this-tags">{(drama.tags || []).join(' • ')}</p>
      </div>
    </div>
  )
}

export default function Detail() {
  const { dramaId } = useParams()
  const navigate = useNavigate()
  usePageFocus('detail')

  const drama = useMemo(() => {
    return MockData.getDramaById(Number(dramaId))
  }, [dramaId])

  const moreLikeThis = useMemo(() => {
    if (!drama) return []
    return MockData.getMoreLikeThis(drama.id)
  }, [drama])

  useEffect(() => {
    if (!drama) {
      navigate('/home')
    }
  }, [drama, navigate])

  if (!drama) return null

  const tagsHTML = (drama.genreTags || []).map((tag) => (
    <div key={tag} className="detail-genre-tag">
      {tag}
    </div>
  ))

  const episodes = drama.episodeList || []

  return (
    <div id="detail-page" className="page active">
      <div className="detail-page-container">
        <div className="detail-hero-section">
          <div className="detail-poster">
            <img src={drama.image} alt={drama.title} />
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{drama.title}</h1>
            <div className="detail-meta">
              <span>
                <i className="icon fas fa-star" /> {drama.rating}
              </span>
              <span>
                <i className="icon fas fa-eye" /> {drama.views} Views
              </span>
              <span>
                <i className="icon fas fa-layer-group" /> {drama.seasons} Season
              </span>
              <span>
                <i className="icon fas fa-clock" /> {drama.duration} min
              </span>
            </div>
            <p className="detail-description">{drama.description}</p>
            <div className="detail-genre-tags">{tagsHTML}</div>
            <div className="detail-actions">
              <button
                className="btn btn-primary btn-play-episode-1"
                data-drama-id={drama.id}
                data-episode-id="1"
                data-focusable="true"
                onClick={() => {
                  if (episodes.length > 0) {
                    navigate(`/player/${drama.id}/${episodes[0].id}`)
                  }
                }}
              >
                <i className="icon fas fa-play" /> Play Episode 1
              </button>
              <button className="btn btn-secondary" data-focusable="true">
                <i className="icon fas fa-plus" /> Add to Watchlist
              </button>
              <button className="btn btn-icon" data-focusable="true">
                <i className="icon fas fa-share-alt" />
              </button>
              <button className="btn btn-icon" data-focusable="true">
                <i className="icon fas fa-download" />
              </button>
            </div>
          </div>
        </div>

        <div className="detail-episodes-section">
          <h2 className="detail-section-title">Episodes ({episodes.length} Episodes)</h2>
          <div className="episode-list-grid">
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                drama={drama}
                episode={episode}
                isActive={false}
                onClick={() => {
                  if (!episode.locked) {
                    navigate(`/player/${drama.id}/${episode.id}`)
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="detail-more-like-this-section">
          <h2 className="detail-section-title">More Like This</h2>
          <div className="more-like-this-grid">
            {moreLikeThis.map((d) => (
              <MoreLikeThisCard
                key={d.id}
                drama={d}
                onClick={() => navigate(`/detail/${d.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
