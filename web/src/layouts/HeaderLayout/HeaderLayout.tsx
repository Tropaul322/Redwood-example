import { NavLink, navigate, routes, useLocation } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

type HeaderLayoutProps = {
  children?: React.ReactNode
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const location = useLocation()
  const { logOut } = useAuth()

  console.log(location)
  return (
    <>
      <header className="flex items-center justify-between px-[48px] py-8">
        <h1 className="text-2xl font-bold">Shopify</h1>
        <div className="flex gap-2 text-base text-[#A3A3A3]">
          <NavLink
            activeClassName="bg-[#ECECEE] text-black"
            className="rounded-lg px-5 py-2 hover:bg-[#ECECEE] hover:text-black"
            to={routes.marketplace()}
          >
            Marketplace
          </NavLink>
          <NavLink
            activeClassName="bg-[#ECECEE] text-black"
            className="rounded-lg px-5 py-2 hover:bg-[#ECECEE] hover:text-black"
            to={routes.myProducts()}
          >
            Your Product
          </NavLink>
        </div>

        <div className="flex gap-4">
          <button
            className="rounded-md border p-3 hover:bg-slate-500"
            onClick={() => navigate(routes.cart())}
          >
            Cart
          </button>
          <button
            className="rounded-md border p-3 hover:bg-slate-500"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
      </header>
      <Toaster />
      {children}
    </>
  )
}

export default HeaderLayout
