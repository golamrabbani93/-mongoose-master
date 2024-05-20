import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoute } from './app/modules/product/product.route'
const app: Application = express()

// ! Parser
app.use(express.json())
app.use(cors())

// !Product Route

app.use('/api/products', productRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Mongoose Master Server is Running')
})

export default app
