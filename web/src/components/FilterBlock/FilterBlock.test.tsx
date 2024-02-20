import { render } from '@redwoodjs/testing/web'

import FilterBlock from './FilterBlock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FilterBlock', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FilterBlock />)
    }).not.toThrow()
  })
})
