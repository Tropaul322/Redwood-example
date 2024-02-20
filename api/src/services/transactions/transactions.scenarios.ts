import type { Prisma, Transaction } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        productIds: 'String',
        userId: 'String',
        status: 'pending',
        price: 'String',
      },
    },
    two: {
      data: {
        productIds: 'String',
        userId: 'String',
        status: 'pending',
        price: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
