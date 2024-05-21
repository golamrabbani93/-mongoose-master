import { Request, Response } from 'express'
import { orderServices } from './order.services'
import { orderValidationSchema } from './order.validation'

// !Create Product
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body

    // !Make Validation Order Data using ZOD Validation
    const validOrderData = orderValidationSchema.parse(orderData)

    const result = await orderServices.saveOrderIntoDB(validOrderData)
    if (result._id) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!!',
        data: result,
      })
    } else {
      res.status(400).json({
        success: true,
        message: 'Order created unsuccessfully!!',
        data: result,
      })
    }
  } catch (error) {
    const validationError = (issues: any[]) => {
      if (!issues) return {}

      return issues.reduce((acc: any, issue, index: number) => {
        const path = issue.path[0]
        const message = issue.message
        acc[`issue-${index + 1}`] = { message, path }
        return acc
      }, {})
    }
    res.status(501).json({
      success: false,
      errorMessage: validationError(error?.issues),
    })
  }
}

// !Get all Orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Get all Order',
    })
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