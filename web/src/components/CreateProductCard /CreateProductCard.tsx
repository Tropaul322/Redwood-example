import { Link, routes } from '@redwoodjs/router'

import PlusIcon from '../Icons/PlusIcon/PlusIcon'

const CreateProductCard = () => {
  return (
    <Link
      to={routes.createProduct()}
      className="flex h-[367px] w-[320px] flex-col items-center justify-center overflow-hidden rounded-md border hover:cursor-pointer hover:bg-[#ECECEE]"
    >
      <div className="h-10 w-10 rounded-full bg-blue-500 p-2">
        <PlusIcon />
      </div>
      <div className="text-blue-500">New Product</div>
    </Link>
  )
}

export default CreateProductCard
