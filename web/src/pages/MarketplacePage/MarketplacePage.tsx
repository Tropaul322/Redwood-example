import { useState } from 'react'

import { Metadata } from '@redwoodjs/web'

import FilterBlock from 'src/components/FilterBlock/FilterBlock'
import ProductsCell from 'src/components/ProductsCell'
import SearchInput from 'src/components/SearchInput/SearchInput'

const MarketplacePage = () => {
  const [search, setSearch] = useState('')

  return (
    <div className="flex gap-[28px] px-[48px]">
      <Metadata title="Marketplace" description="Marketplace" />
      <div className="w-[315px]">
        <FilterBlock />
      </div>

      <div className="w-full">
        <SearchInput setSearch={setSearch} />
        <ProductsCell search={search} />
      </div>
    </div>
  )
}

export default MarketplacePage
