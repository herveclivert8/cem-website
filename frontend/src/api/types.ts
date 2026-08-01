export interface Tag {
  id: number
  name: string
}

export interface Project {
  id: number
  title: string
  title_en: string | null
  description: string
  description_en: string | null
  image_url: string | null
  zone_geo: string | null
  tags: Tag[]
  contributors_count: number
  updated_at: string
  created_at: string
}

export type PublicationFormat = 'pdf' | 'rapport'

export interface Publication {
  id: number
  title: string
  title_en: string | null
  description: string
  description_en: string | null
  file_url: string | null
  thumbnail_url: string | null
  format: PublicationFormat
  contributors_count: number
  updated_at: string
  created_at: string
}

export interface CallForParticipation {
  id: number
  project_id: number | null
  text: string
  text_en: string | null
  created_at: string
}

export type UserRole = 'member' | 'contributor' | 'admin'

export interface User {
  id: number
  email: string
  full_name: string
  avatar_url: string | null
  role: UserRole
  created_at: string
}

export interface IdeaPost {
  id: number
  content: string
  created_at: string
  author: User
}
