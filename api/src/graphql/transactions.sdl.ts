export const schema = gql`
  type Transaction {
    id: String!
    productIds: [String]!
    userId: String!
    status: TransactionStatus!
    price: String!
    createdAt: DateTime!
  }

  input ProductInput {
    id: String!
    name: String!
    price: String!
    image: String!
    creatorId: String!
    quantity: Float!
  }

  type MyTransactionsResult {
    id: String!
    name: String!
    price: String!
    image: String!
    creatorId: String!
    createdAt: DateTime!
    transactionDate: DateTime!
  }

  type CreateTransactionResult {
    id: String!
    productIds: [String]!
    userId: String!
    status: TransactionStatus!
    price: String!
    createdAt: DateTime!
    redirectToCart: String!
  }

  enum TransactionStatus {
    pending
    success
    failed
  }

  type Query {
    myTransactions: [MyTransactionsResult!]! @requireAuth
    transaction(id: String!): Transaction @requireAuth
  }

  input CreateTransactionInput {
    products: [ProductInput]!
    userId: String!
    price: String!
  }

  input UpdateTransactionInput {
    productIds: [String]!
    userId: String
    status: TransactionStatus
    price: String
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): CreateTransactionResult!
      @requireAuth
    updateTransaction(
      id: String!
      input: UpdateTransactionInput!
    ): Transaction! @requireAuth
    deleteTransaction(id: String!): Transaction! @requireAuth
  }
`
