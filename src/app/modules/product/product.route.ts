import express, { Request, Response } from 'express'
import { productController } from './product.controller'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('product Route')
})

router.post('/', productController.createProduct)

export const productRoute = router
