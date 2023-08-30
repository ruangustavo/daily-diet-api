import { Request, Response } from 'express'
import { UserRepository } from '../../repositories/user-repository'
import { z } from 'zod'
import { SignInUsecase } from './sign-in.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { InvalidCredentialsError } from '@/errors/invalid-credentials.error'
import { JwtToken } from '@/infra/shared/token/jwt.token'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export class SignInController {
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: JwtToken,
  ) {}

  async handle(request: Request, response: Response) {
    const signInUsecase = new SignInUsecase(
      this.userRepository,
      this.tokenProvider,
    )

    const parsedBody = signInSchema.safeParse(request.body)
    if (!parsedBody.success) {
      return response.status(422).json({
        message: 'Validation error',
        errors: parsedBody.error.issues,
      })
    }

    const { email, password } = parsedBody.data

    try {
      const result = await signInUsecase.execute({ email, password }) // returns the jwt token
      return response.status(200).json({ access_token: result })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(error.statusCode).json({ error: error.message })
      }

      if (error instanceof InvalidCredentialsError) {
        return response.status(error.statusCode).json({ error: error.message })
      }
    }
  }
}
