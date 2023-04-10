const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_URI_DEV

const PORT = process.env.PORT || 4000

const config = {
    MONGODB_URI,
    PORT
}

export default config