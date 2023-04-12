import { Schema, model, Types } from 'mongoose'
import { UserDbObject } from '../generated/graphql'

const schema = new Schema<UserDbObject>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export default model('User', schema)