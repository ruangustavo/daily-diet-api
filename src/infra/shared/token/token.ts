import { User } from '@prisma/client'

export interface TokenPayload {
  sub: string
  email: string
}

export interface Token {
  create(user: User): string
  verify(token: string): TokenPayload
}
