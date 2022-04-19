import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routers/Auth_router.js'
import cors from 'cors'
 
const app = express()



const PORT = process.env.PORT || 3001   
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)

const start = async () => {
    try{
        await mongoose.connect(DB_URL)

        app.listen(PORT, () => console.log(`Server work on ${PORT}`))
    }catch(e){
        console.log(e);
    }
}

start()