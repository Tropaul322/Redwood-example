// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'
import HeaderLayout from './layouts/HeaderLayout/HeaderLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet wrap={HeaderLayout} unauthenticated="login">
        <Route notfound page={NotFoundPage} />
        <Route path="/create-product" page={CreateProductPage} name="createProduct" />
        <Route path="/my-products" page={MyProductsPage} name="myProducts" />
        <Route path="/marketplace" page={MarketplacePage} name="marketplace" />
        <Route path="/history" page={HistoryPage} name="history" />
        <Route path="/cart" page={CartPage} name="cart" />
      </PrivateSet>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
    </Router>
  )
}

export default Routes
