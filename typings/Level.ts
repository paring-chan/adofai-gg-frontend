export interface Level {
  id: number
  artists: string[]
  creators: string[]
  censored: boolean
  comments: number
  likes: number
  maxBpm: number
  minBpm: number
  song: string
  songId: number
  tags: any[]
  tiles: number
  title: string
  video: string
  download: string
  workshop: string | null
  difficulty: number
  epilepsyWarning: boolean
  hasNSFW: boolean
  youtubeId: string
}
