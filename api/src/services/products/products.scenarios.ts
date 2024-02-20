import type { Prisma, Product } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProductCreateArgs>({
  product: {
    one: {
      data: {
        name: 'String',
        price: 'String',
        image: 'String',
        creatorId: 'String',
      },
    },
    two: {
      data: {
        name: 'String',
        price: 'String',
        image: 'String',
        creatorId: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Product, 'product'>
