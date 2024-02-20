import { useEffect, useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { formatCurrency } from 'src/utils/formatPrice'

const CREAtE_TRANSACTION_MUTATION = gql`
  mutation CreateTransactionMutation($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      redirectToCart
    }
  }
`

const CartPage = () => {
  const [cart, setCart] = useState([])
  const { currentUser } = useAuth()
  const [create] = useMutation(CREAtE_TRANSACTION_MUTATION)

  const getTotalValue = () => {
    const total = cart.reduce((prev, cur) => {
      return prev + cur.price * cur.quantity
    }, 0)

    return formatCurrency(total)
  }

  const submit = async () => {
    const input = {
      products: cart.map(({ __typename, ...rest }) => rest),
      userId: currentUser.id,
      price: getTotalValue(),
    }

    const data = await create({
      variables: {
        input,
      },
    })

    if (!data.errors) {
      localStorage.removeItem('cart')
    }
    window.location.href = data.data.createTransaction.redirectToCart
  }

  useEffect(() => {
    const localStorageCart = localStorage.getItem('cart')
    console.log(localStorageCart)

    if (!localStorageCart) {
      setCart([])
      return
    }

    const parsedCart = JSON.parse(localStorage.getItem('cart'))

    setCart(Object.values(parsedCart))
  }, [])

  const onRemove = (product) => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    const { [product.id]: _omitted, ...rest } = localCart

    localStorage.setItem('cart', JSON.stringify(rest))

    setCart(Object.values(rest))
  }

  const onIncrease = (product) => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    localCart[product.id] = {
      ...localCart[product.id],
      quantity: localCart[product.id].quantity + 1,
    }
    localStorage.setItem('cart', JSON.stringify(localCart))

    setCart(Object.values(localCart))
  }

  const onDecrease = (product) => {
    if (product.quantity - 1 === 0) {
      onRemove(product)
    }

    if (product.quantity - 1 < 0) {
      toast.error('Quantity must be > then 0')
      return
    }

    const localCart = JSON.parse(localStorage.getItem('cart'))
    localCart[product.id] = {
      ...localCart[product.id],
      quantity: localCart[product.id].quantity - 1,
    }
    localStorage.setItem('cart', JSON.stringify(localCart))

    setCart(Object.values(localCart))
  }

  return (
    <div className="flex flex-col p-10">
      <Toaster />
      <Metadata title="Cart" description="Cart page" />

      <div className="flex gap-5">
        <Link
          className="text-2xl font-bold hover:bg-slate-400"
          to={routes.cart()}
        >
          Cart
        </Link>
        <Link
          className="text-2xl font-bold hover:bg-slate-400"
          to={routes.history()}
        >
          History
        </Link>
      </div>
      {cart.length ? (
        <div className="flex gap-10">
          <table className="w-9/12 table-auto">
            <thead>
              <tr>
                <th className="w-3/5 px-[15px] text-left">Item</th>
                <th className="w-1/6 px-[15px] text-right">Unit Price</th>
                <th className="w-1/6 px-[15px] text-right">Quantity</th>
                <th className="w-1/6"></th>
              </tr>
            </thead>

            {cart.map((product) => {
              return (
                <tr key={product.id}>
                  <td className="px-[15px]">
                    <div className="flex items-center gap-5">
                      <img
                        src={product.image}
                        className="h-[100px] w-[100px] rounded-md"
                        alt=""
                      />
                      <span className="text-center">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-[15px] text-right">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-[15px]">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => onDecrease(product)}
                        className="h-8 w-8 border hover:bg-slate-400"
                      >
                        -
                      </button>
                      {product.quantity}
                      <button
                        onClick={() => onIncrease(product)}
                        className="h-8 w-8 border hover:bg-slate-400"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <button onClick={() => onRemove(product)}>Remove</button>
                  </td>
                </tr>
              )
            })}
          </table>

          <div className="w-1/6 rounded-md border bg-white p-[20px]">
            <h2 className="text-xl font-bold">Summary</h2>
            <hr className="my-5" />
            <div className="flex justify-between">
              <h3 className="text-base font-thin">Total price:</h3>
              <h3 className="text-base font-bold">{getTotalValue()}</h3>
            </div>
            <button
              onClick={submit}
              className="mt-4 w-full rounded-md bg-blue-500 py-2 text-sm text-white"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div>No products yet.</div>
      )}
    </div>
  )
}

export default CartPage
