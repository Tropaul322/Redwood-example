const FilterBlock = () => {
  return (
    <div className="rounded-md border bg-white p-[20px]">
      <h2 className="text-lg font-bold">Filters</h2>
      <div className="mt-3">
        <h3 className="text-base font-bold">Price</h3>
        <div className="mt-2 flex gap-5">
          <input
            className="w-28 rounded-md border p-1 pl-2"
            placeholder="Form:"
            type="number"
          ></input>
          <input
            className="w-28 rounded-md border p-1 pl-2"
            placeholder="To:"
            type="number"
          ></input>
        </div>
      </div>
    </div>
  )
}

export default FilterBlock
