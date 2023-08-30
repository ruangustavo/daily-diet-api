import { JwtToken } from '@/infra/shared/token/jwt.token'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { SignInController } from './sign-in.controller'

const userRepository = new PrismaUserRepository()
const tokenProvider = new JwtToken()
export const createSignInController = new SignInController(
  userRepository,
  tokenProvider,
)
