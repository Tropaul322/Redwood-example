import { Form, SearchField } from '@redwoodjs/forms'

const SearchInput = ({ setSearch }) => {
  const onInputChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <Form>
      <SearchField
        className="w-full rounded-md border px-8 py-[13.5px]"
        onChange={onInputChange}
        name="search"
        placeholder="Type to search..."
      />
    </Form>
  )
}

export default SearchInput
