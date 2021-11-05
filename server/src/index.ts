import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from '../router';

const PORT = process.env.PORT || 6001

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {}, () => {
            console.log(`Connect to db`)
        })

        app.listen(6001, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
