import { render } from '@redwoodjs/testing/web'

import MyProductsPage from './MyProductsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MyProductsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MyProductsPage />)
    }).not.toThrow()
  })
})
