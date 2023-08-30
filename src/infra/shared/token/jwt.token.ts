import { User } from '@prisma/client'
import { Token, TokenPayload } from './token'
import { sign, verify } from 'jsonwebtoken'

export class JwtToken implements Token {
  private SECRET_KEY = process.env.SECRET_KEY_JWT ?? ''

  create({ id, email }: User): string {
    const token = sign({ id, email }, this.SECRET_KEY, {
      expiresIn: '1h',
    })
    return token
  }

  verify(token: string): TokenPayload {
    const decodedToken = verify(token, this.SECRET_KEY)
    return decodedToken as unknown as TokenPayload
  }
}
