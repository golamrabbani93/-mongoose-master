import { Request, Response } from 'express'

// !Get all Products And search Products
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
  getAllOrders,
}
