export interface AuthUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: 'admin' | 'user'
}

export interface AuthSession {
  user: AuthUser
  expires: string
}

export interface DecodedIdToken {
  sub?: string
  name?: string
  email?: string
  picture?: string
  'https://myapp.com/roles'?: string[]
  iat?: number
  exp?: number
}

export type UserRole = 'admin' | 'user'