import { gql } from "apollo-server"

const typeDefs = gql`
type Query {
  books: [Book]
}

type Book {
  title: String
  author: String
}

type AddBookMutationResponse {
  code: String!
  success: Boolean!
  message: String!
  book: Book
}

type Mutation {
  addBook(title: String, author: String): AddBookMutationResponse
}
`

export default typeDefs