import { Link, routes } from '@redwoodjs/router'
import { Metadata, useQuery } from '@redwoodjs/web'

import Loader from 'src/components/Loader/Loader'
import { formatCurrency } from 'src/utils/formatPrice'

export const GET_MY_TRANSACTIONS_QUERY = gql`
  query MyTransactionsQuery {
    myTransactions {
      id
      name
      image
      price
      creatorId
      transactionDate
    }
  }
`

const HistoryPage = () => {
  const { data, loading } = useQuery(GET_MY_TRANSACTIONS_QUERY)

  if (loading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col p-10">
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
      {data.myTransactions.length ? (
        <table className="w-9/12 table-auto">
          <thead>
            <tr>
              <th className="w-3/5 px-[15px] text-left">Item</th>
              <th className="w-1/6 px-[15px] text-right">Unit Price</th>
              <th className="w-1/6 px-[15px] text-right">Date</th>
            </tr>
          </thead>

          {data.myTransactions.map((product) => {
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
                <td className="px-[15px] text-right">
                  {new Date(product.transactionDate).toDateString()}
                </td>
              </tr>
            )
          })}
        </table>
      ) : (
        <div>No products yet.</div>
      )}
    </div>
  )
}

export default HistoryPage
