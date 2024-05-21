import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()

// !Get All Order
router.get('/', orderController.getAllOrders)

export const orderRoute = router
