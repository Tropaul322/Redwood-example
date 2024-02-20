import { Metadata, useQuery } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import CreateProductCard from 'src/components/CreateProductCard /CreateProductCard'
import ProductCard from 'src/components/ProductCard/ProductCard'
import { Loading } from 'src/components/ProductsCell'

export const GET_MY_PRODUCTS_QUERY = gql`
  query MyProductsQuery {
    myProducts {
      id
      name
      image
      price
      creatorId
    }
  }
`

const MyProductsPage = () => {
  const { data, loading } = useQuery(GET_MY_PRODUCTS_QUERY)

  if (loading) {
    return <Loading />
  }

  return (
    <div className="w-full px-[48px]">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Metadata title="MyProducts" description="MyProducts page" />

      <h1 className="text-lg font-semibold">Your Products</h1>
      <div className="flex flex-wrap gap-4">
        <CreateProductCard />
        {data.myProducts.map((el) => (
          <ProductCard key={el.id} product={el} />
        ))}
      </div>
    </div>
  )
}

export default MyProductsPage
