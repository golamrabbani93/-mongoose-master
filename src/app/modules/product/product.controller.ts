import { Request, Response } from 'express'
// !Create Product

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body
  res.send(productData)
}

export const productController = {
  createProduct,
}
