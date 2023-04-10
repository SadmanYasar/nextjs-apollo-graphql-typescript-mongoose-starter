// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import { Resolvers } from './generated/graphql'

export const resolvers: Resolvers = {
    Query: {
        // TypeScript now complains about the below resolver because
        // the data returned by this resolver doesn't match the schema type
        // (i.e., type Query { books: [Book] })
        books: () => [
            {
                title: 'Harry Potter and the Chamber of Secrets'
            },
            {
                title: 'Jurassic Park'
            }
        ]
        ,
    },
}

export default resolvers;