import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import http from 'http'
import cors from 'cors'
import config from './utils/config'
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'
import Cookies from 'cookies'
import clerk from '@clerk/clerk-sdk-node'

const { MONGODB_URI, PORT } = config

// import Veterinarian from './models/veterinarian'

import {
    typeDefs as scalarTypeDefs,
    resolvers as scalarResolvers,
} from 'graphql-scalars'
import typeDefs from './schema'
import resolvers from './resolvers'

import mongoose from 'mongoose'
// import Admin from './models/admin'
// import Client from './models/client'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const start = async () => {
    const app = express()
    app.use(cors<cors.CorsRequest>())

    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({
        typeDefs: [
            ...scalarTypeDefs,
            typeDefs,
            DIRECTIVES
        ],
        resolvers: [
            scalarResolvers,
            resolvers
        ]
    })

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        introspection: process.env.NODE_ENV !== 'production',
        context: async ({ req, res }) => {
            //authenticate user using Clerk
            // TODO - USE CLERK TO AUTHENTICATE USER
            // Retrieve the particular session ID from a
            // query string parameter
            const sessionId = req.query._clerk_session_id as string

            // Note: Clerk stores the clientToken in a cookie 
            const cookies = new Cookies(req, res)
            const clientToken = cookies.get('__session')
            const session = await clerk.sessions.verifySession(sessionId, clientToken)
            const userId = session.userId

            const user = await clerk.users.getUser(userId)
            return { user }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer: httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: '/',
        cors: true
    })

    const PORT = process.env.PORT

    httpServer.listen(PORT, () =>
        console.log(`🚀 Server is now running on http://localhost:${PORT}`)
    )
}

start()