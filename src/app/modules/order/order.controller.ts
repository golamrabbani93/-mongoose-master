import { Request, Response } from 'express'
import { orderServices } from './order.services'
import { orderValidationSchema } from './order.validation'
import { ZodError, ZodIssue } from 'zod'

// Define the type for the validation error output
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
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    // !Make Validation Order Data using ZOD Validation
    const validOrderData = orderValidationSchema.parse(orderData)

    const result = await orderServices.saveOrderIntoDB(validOrderData)

    if (result !== false && result !== 'not Found') {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!!',
        data: result,
      })
    }
    //! This Condition Use for Product Quantity Check
    else if (result === false) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    }

    //! This Condition Use for Product Not Found
    else if (result === 'not Found') {
      res.status(400).json({
        success: false,
        message: 'Product Not Found',
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Order created unsuccessfull!!',
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

// !Get all Orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string | undefined

    const result = await orderServices.getAllOrderIntoDB(userEmail)
    if (userEmail && result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    } else if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: false,
        message: 'Order Not Found!',
      })
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: 'There is a problem with the server',
    })
  }
}

export const orderController = {
  createOrder,
  getAllOrders,
}
