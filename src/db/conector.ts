import { PrismaClient } from '@prisma/client'

const prismaConector = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = prismaConector.prisma ?? new PrismaClient()
