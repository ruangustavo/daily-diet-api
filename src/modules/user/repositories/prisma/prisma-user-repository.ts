import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { prisma } from '@/infra/database/prisma'

export class PrismaUserRepository implements UserRepository {
  async create(user: Prisma.UserCreateInput): Promise<User> {
    const userCreated = await prisma.user.create({ data: user })
    return userCreated
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
