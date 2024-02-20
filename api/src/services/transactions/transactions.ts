import Stripe from 'stripe'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { stripe } from 'src/lib/stripe'
import { validate } from '@redwoodjs/api'

export const myTransactions: QueryResolvers['myTransactions'] = async () => {
  const data = await db.transaction.findMany({
    where: { userId: context.currentUser.id, status: 'success' },
  })

  const products = await Promise.all(
    data.map(async (t) => {
      const products = await db.product.findMany({
        where: { id: { in: t.productIds } },
      })

      return products.map((p) => ({
        ...p,
        transactionDate: t.createdAt,
      }))
    })
  )

  return products.flat(1)
}

export const transaction: QueryResolvers['transaction'] = ({ id }) => {
  return db.transaction.findUnique({
    where: { id },
  })
}

export const createTransaction: MutationResolvers['createTransaction'] =
  async ({ input }) => {
    const { products, ...rest } = input
    const productIds = products.map((p) => p.id)
    const transaction = await db.transaction.create({
      data: { ...rest, productIds, status: 'pending' },
    })

    const line_items = products.map((p) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: p.name,
          images: [p.image],
        },
        unit_amount: Number(p.price) * 100,
      },
      quantity: Number(p.quantity),
    })) as Stripe.Checkout.SessionCreateParams.LineItem[]

    const stripeCheckout = await stripe.checkout.sessions.create({
      line_items,
      metadata: {
        transactionId: transaction.id,
      },
      mode: 'payment',
      success_url: 'http://localhost:8910/history',
      cancel_url: 'http://localhost:8910/cart',
    })

    return { ...transaction, redirectToCart: stripeCheckout.url }
  }

export const updateTransaction: MutationResolvers['updateTransaction'] = ({
  id,
  input,
}) => {
  return db.transaction.update({
    data: input,
    where: { id },
  })
}

export const deleteTransaction: MutationResolvers['deleteTransaction'] = ({
  id,
}) => {
  return db.transaction.delete({
    where: { id },
  })
}
