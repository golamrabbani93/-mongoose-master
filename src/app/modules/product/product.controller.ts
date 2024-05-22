import { Request, Response } from 'express'
import { productServices } from './product.services'
import { productValidationSchema } from './product.validation'
import { ZodError, ZodIssue } from 'zod'
import { Product } from './product.interface'

type ValidationErrorOutput = {
  [key: string]: {
    message: string
    path: string
  }
}
const validationError = (issues?: ZodIssue[]): ValidationErrorOutput => {
  if (!issues) return {}

  return issues.reduce(
    (acc: ValidationErrorOutput, issue: ZodIssue, index: number) => {
      const path = issue.path[0] as string
      const message = issue.message
      acc[`issue-${index + 1}`] = { message, path }
      return acc
    },
    {},
  )
}

// !Create Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body

    // !Make Validation productData using ZOD Validation
    const validProductData = productValidationSchema.parse(productData)
    const result = await productServices.saveProductIntoDB(validProductData)
    if (result._id) {
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: result,
      })
    } else {
      res.status(400).json({
        success: true,
        message: 'Product created Unsuccessfully!',
        data: result,
      })
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        errorMessage: validationError(error.issues),
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      })
    }
  }
}

// !Get all Products And search Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined

    const result = await productServices.getAllProductIntoDB(searchTerm)
    if (searchTerm && result.length > 0) {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      })
    } else if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: false,
        message: 'Products Not Found!',
      })
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: 'There is a problem with the server',
    })
  }
}

// ! Get Single Product By ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productID = req.params.productId as string
    const result = await productServices.getSingleProductIntoDB(productID)
    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
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

// ! Update Product Quantity By Product Id
const updateProduct = async (req: Request, res: Response) => {
  try {
    // !Get Product id From params
    const productID = req.params.productId as string

    // !get update doc from user
    const updateProductDoc: Product = req.body

    // !Make Validation productData using ZOD Validation
    const validUpdateProductData =
      productValidationSchema.parse(updateProductDoc)

    // !Send ProductId And validUpdateProductData
    const result = await productServices.updateProductIntoDB(
      productID,
      validUpdateProductData,
    )
    if (result !== false) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Product updated Unsuccessfully!',
        data: null,
      })
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        errorMessage: validationError(error.issues),
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      })
    }
  }
}

// ! Delete Product By ID
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const productID = req.params.productId as string
    const result = await productServices.deleteSingleProductIntoDB(productID)
    if (result?.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Product deleted Unsuccessfully!',
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
  getSingleProduct,
  updateProduct,
  deleteSingleProduct,
}
