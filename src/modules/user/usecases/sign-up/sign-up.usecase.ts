import { EmailAreadyExistsError } from '@/errors/email-already-exists.error'
import { UserRepository } from '../../repositories/user-repository'
import * as bcrypt from 'bcrypt'

interface SignUpRequest {
  email: string
  password: string
}

export class SignUpUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: SignUpRequest) {
    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new EmailAreadyExistsError()
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userCreated = this.userRepository.create({
      email,
      password: hashedPassword,
    })
    return userCreated
  }
}
