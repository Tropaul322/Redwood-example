import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validateWith } from '@redwoodjs/api'

import { db } from 'src/lib/db'

interface FilterQuery {
  [key: string]: string | object | number
}

export const products: QueryResolvers['products'] = ({ filter }) => {
  const { name } = filter
  const filterQuery: FilterQuery = {}

  if (name) {
    filterQuery.name = { contains: name }
  }

  return db.product.findMany({ where: filterQuery })
}

export const product: QueryResolvers['product'] = ({ id }) => {
  return db.product.findUnique({
    where: { id },
  })
}

export const myProducts: QueryResolvers['myProducts'] = () => {
  return db.product.findMany({
    where: { creatorId: context.currentUser.id },
  })
}

export const createProduct: MutationResolvers['createProduct'] = ({
  input,
}) => {
  return db.product.create({
    data: { ...input, creatorId: context.currentUser.id },
  })
}

export const updateProduct: MutationResolvers['updateProduct'] = ({
  id,
  input,
}) => {
  return db.product.update({
    data: input,
    where: { id },
  })
}

export const deleteProduct: MutationResolvers['deleteProduct'] = async ({
  id,
}) => {
  await validateWith(async () => {
    const product = await db.product.findUnique({ where: { id } })
    if (product.creatorId !== context.currentUser.id) {
      throw 'You are not allowed to do this'
    }
  })
  return db.product.delete({
    where: { id },
  })
}
