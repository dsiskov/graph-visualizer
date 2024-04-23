import express from 'express'
import cors from 'cors'
import router from './router'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use('/api', router)

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
