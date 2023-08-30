import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { UserRepository } from '../../repositories/user-repository'
import * as bcrypt from 'bcrypt'
import { InvalidCredentialsError } from '@/errors/invalid-credentials.error'
import { JwtToken } from '@/infra/shared/token/jwt.token'

interface SignInRequest {
  email: string
  password: string
}

export class SignInUsecase {
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: JwtToken,
  ) {}

  async execute({ email, password }: SignInRequest) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new ResourceNotFoundError('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    const accessToken = this.tokenProvider.create(user)
    return accessToken
  }
}
