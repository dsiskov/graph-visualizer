import express from 'express'
import router from './router'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use('/api', router)

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
