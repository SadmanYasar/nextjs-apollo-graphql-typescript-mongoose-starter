// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import { Resolvers } from './generated/graphql'

export const resolvers: Resolvers = {
    Query: {
        books: () => [
            {
                title: 'Harry Potter and the Chamber of Secrets'
            },
            {
                title: 'Jurassic Park'
            }
        ]
        ,
        me: () => ({
            id: '1',
            username: 'test',
            email: 'test@mail.com',
        })
    },
}

export default resolvers;