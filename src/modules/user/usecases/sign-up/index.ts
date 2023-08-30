import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { SignUpController } from './sign-up.controller'

const userRepository = new PrismaUserRepository()
export const createSignUpController = new SignUpController(userRepository)
