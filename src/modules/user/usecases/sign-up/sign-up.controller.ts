import { Request, Response } from 'express'
import { UserRepository } from '../../repositories/user-repository'
import { SignUpUsecase } from './sign-up.usecase'
import { z } from 'zod'
import { EmailAreadyExistsError } from '@/errors/email-already-exists.error'

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })

export class SignUpController {
  constructor(private userRepository: UserRepository) {}

  async handle(request: Request, response: Response) {
    const signUpUsecase = new SignUpUsecase(this.userRepository)

    const parsedBody = signUpSchema.safeParse(request.body)
    if (!parsedBody.success) {
      return response.status(422).json({
        message: 'Validation error',
        errors: parsedBody.error.issues,
      })
    }

    const { email, password } = parsedBody.data

    try {
      const result = await signUpUsecase.execute({ email, password })
      return response.status(201).json({ user: result })
    } catch (error) {
      if (error instanceof EmailAreadyExistsError) {
        return response.status(error.statusCode).json({ error: error.message })
      }
    }
  }
}
