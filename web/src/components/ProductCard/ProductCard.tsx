/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'

import { Submit } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { GET_MY_PRODUCTS_QUERY } from 'src/pages/MyProductsPage/MyProductsPage'
import { formatCurrency } from 'src/utils/formatPrice'

interface ProductCardProps {
  product: {
    name: string
    id: string
    price: string
    image: string
    creatorId: string
  }
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: String!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

const ProductCard = (props: ProductCardProps) => {
  const { currentUser } = useAuth()
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [GET_MY_PRODUCTS_QUERY],
  })
  const [isInCart, setIsInCart] = useState(false)
  const { product } = props
  const isCreator = currentUser.id === product.creatorId

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('cart'))?.[product.id]) {
      setIsInCart(true)
    }
  }, [])

  const onDeleteClick = () => {
    deleteProduct({ variables: { id: String(product.id) } })
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {}

    cart[product.id] = { ...product, quantity: 1 }

    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success(`${product.name} was added to cart`)
    setIsInCart(true)
  }

  const redirectToCart = () => {
    navigate(routes.cart())
  }

  return (
    <div className="h-full w-[320px] overflow-hidden rounded-md border">
      <div className="relative">
        {isCreator && (
          <div className="absolute right-3 top-3 h-8 w-8 cursor-pointer rounded-md border bg-gray-0 p-1">
            <img
              onClick={onDeleteClick}
              src="https://cdn-icons-png.flaticon.com/512/1843/1843344.png"
              alt="trash"
            />
          </div>
        )}
        <img
          className="z-0 h-72 w-full object-cover"
          src={product.image}
          alt="product-img"
        />
      </div>
      <div className="h-17 mb-22 border-t p-2.5">
        <h2 className="font-semibold">{product.name}</h2>
        <div className="mt-2 flex justify-between">
          <div className="text-[#A3A3A3]">Price:</div>
          <div className="font-semibold">{formatCurrency(product.price)}</div>
        </div>
        {!isCreator && (
          <Submit
            onClick={isInCart ? redirectToCart : addToCart}
            className="mt-1 w-full rounded-md bg-blue-500 p-1 text-white"
          >
            {!isInCart ? 'Add to cart' : 'In cart'}
          </Submit>
        )}
      </div>
    </div>
  )
}

export default ProductCard
