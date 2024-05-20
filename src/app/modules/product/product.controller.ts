import { Request, Response } from 'express'
import { productServices } from './product.services'

// !Create Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const result = await productServices.saveProductIntoDB(productData)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(501).json({
      success: false,
      message: 'There is a problem with the server',
    })
  }
}

// !Get all Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductIntoDB()
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'There is no Products data here',
        data: null,
      })
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: 'There is a problem with the server',
    })
  }
}

export const productController = {
  createProduct,
  getAllProducts,
}
