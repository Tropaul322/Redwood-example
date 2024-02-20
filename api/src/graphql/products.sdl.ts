export const schema = gql`
  type Product {
    id: String!
    name: String!
    price: String!
    image: String!
    creatorId: String!
    createdAt: DateTime!
  }

  input QueryFilterInput {
    name: String
    price: Float
  }

  type Query {
    products(filter: QueryFilterInput!): [Product!]! @requireAuth
    product(id: String!): Product @requireAuth
    myProducts: [Product!]! @requireAuth
  }

  input CreateProductInput {
    name: String!
    price: String!
    image: String!
  }

  input UpdateProductInput {
    name: String
    price: String
    image: String
    creatorId: String
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: String!, input: UpdateProductInput!): Product!
      @requireAuth
    deleteProduct(id: String!): Product! @requireAuth
  }
`
