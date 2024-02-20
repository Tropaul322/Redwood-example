import type { ProductsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ProductCard from '../ProductCard/ProductCard'

export const QUERY = gql`
  query ProductsQuery($search: String!) {
    products(filter: { name: $search }) {
      id
      name
      image
      price
      creatorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ products }: CellSuccessProps<ProductsQuery>) => {
  return (
    <div className="mt-12 flex flex-wrap gap-[28px]">
      {products.map((item) => {
        return <ProductCard key={item.id} product={item} />
      })}
    </div>
  )
}
