export interface Episode {
  id: number
  title: string
  description: string
  duration: string
  added: string
  thumbnail: string
  videoUrl: string
  locked?: boolean
}

export interface Drama {
  id: number
  title: string
  year: number
  seasons: number
  duration: string
  rating: number
  views: string
  category: string
  categoryName: string
  tags: string[]
  genreTags: string[]
  description: string
  image: string
  badge?: string
  episodeList: Episode[]
  cardIcon?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  subgenres: string[]
  seriesCount?: number
}

export interface DetailParams {
  dramaId: string
}

export interface PlayerParams {
  dramaId: string
  episodeId: string
}
