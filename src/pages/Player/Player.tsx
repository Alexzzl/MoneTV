import { useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePageFocus } from '../../hooks/usePageFocus'
import MockData from '../../data/mock'
import type { Drama, Episode } from '../../types'

function EpisodeItem({
  episode,
  isActive,
  onClick,
}: {
  episode: Episode
  isActive: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`episode-item ${isActive ? 'active' : ''}`}
      data-episode-id={episode.id}
      data-focusable="true"
      onClick={onClick}
    >
      <img src={episode.thumbnail} alt={episode.title} />
      <div className="episode-details">
        <div className="episode-number">Episode {episode.id}</div>
        <div className="episode-title">{episode.title}</div>
      </div>
    </div>
  )
}

export default function Player() {
  const { dramaId, episodeId } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  usePageFocus('player')

  const drama = useMemo(() => MockData.getDramaById(Number(dramaId)), [dramaId])
  const episode = useMemo(
    () => drama?.episodeList.find((ep) => ep.id === Number(episodeId)),
    [drama, episodeId]
  )

  useEffect(() => {
    if (!drama || !episode) {
      navigate('/home')
    }
  }, [drama, episode, navigate])

  // Auto-focus video area when entering player page
  useEffect(() => {
    const timer = setTimeout(() => {
      const videoArea = document.getElementById('video-player-area')
      if (videoArea) {
        Remote.setFocus(videoArea)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [episodeId])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !episode) return

    const handleEnded = () => {
      if (!drama) return
      const currentIndex = drama.episodeList.findIndex((ep) => ep.id === episode.id)
      if (currentIndex < drama.episodeList.length - 1) {
        const nextEpisode = drama.episodeList[currentIndex + 1]
        navigate(`/player/${drama.id}/${nextEpisode.id}`)
      }
    }

    // Handle focus-based click on video area
    const handleVideoAreaClick = () => {
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }

    const videoArea = document.getElementById('video-player-area')
    if (videoArea) {
      videoArea.addEventListener('click', handleVideoAreaClick)
    }

    video.addEventListener('ended', handleEnded)
    return () => {
      video.removeEventListener('ended', handleEnded)
      if (videoArea) {
        videoArea.removeEventListener('click', handleVideoAreaClick)
      }
    }
  }, [drama, episode, navigate])

  useEffect(() => {
    return () => {
      const video = videoRef.current
      if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
    }
  }, [])

  if (!drama || !episode) return null

  return (
    <div id="player-page" className="page active">
      <div className="player-container">
        <div id="video-player-area" className="video-player" data-focusable="true" tabIndex={0}>
          <video
            ref={videoRef}
            id="video-player"
            className="main-video"
            src={episode.videoUrl}
            poster={episode.thumbnail}
            autoPlay
            playsInline
          />
          <div className="player-controls">
            <div className="episode-info">
              <h3 className="drama-title">{drama.title}</h3>
              <p className="episode-title">{episode.title}</p>
            </div>
          </div>
        </div>
        <div className="player-sidebar">
          <div className="episode-list">
            <h4>Episodes</h4>
            {drama.episodeList.map((ep) => (
              <EpisodeItem
                key={ep.id}
                episode={ep}
                isActive={ep.id === episode.id}
                onClick={() => {
                  if (ep.id !== episode.id) {
                    navigate(`/player/${drama.id}/${ep.id}`)
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
