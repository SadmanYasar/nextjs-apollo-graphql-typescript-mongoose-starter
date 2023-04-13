import { gql } from "apollo-server"

const typeDefs = gql`
type Query {
  books: [Book]
  me: UserResponse
}

type UserResponse {
  id: String
  username: String!
  email: String
}

type User @entity {
  id: String @id
  username: String! @column
  email: String @column
  password: String! @column
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