import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoute } from './app/modules/product/product.route'
import { orderRoute } from './app/modules/order/order.route'
const app: Application = express()

// ! Parser
app.use(express.json())
app.use(cors())

// !Product Route
app.use('/api/products', productRoute)

// !Order Route
app.use('/api/orders', orderRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Mongoose Master Server is Running')
})

//! Route Not Found Error
app.all('*', (req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: 'Route not found',
  })
})
export default app
