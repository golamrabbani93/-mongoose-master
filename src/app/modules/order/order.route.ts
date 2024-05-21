import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()

// !Create  Order
router.post('/', orderController.createOrder)

// !Get All Order
router.get('/', orderController.getAllOrders)

export const orderRoute = router
