import { productServices } from '../product/product.services'
import { Order } from './order.interface.'
import { OrderModel } from './order.model'

// ! Save Order In databse
const saveOrderIntoDB = async (orderData: Order) => {
  // !get Product id and quantity
  const { productId, quantity } = orderData

  //  !upadte Quantity with productID
  const updateQuantity = await productServices.updateProductIntoDB(
    productId,
    quantity,
  )
  // ! If Product Quantity Available the user create new order
  if (updateQuantity !== false) {
    const result = await OrderModel.create(orderData)
    return result
  }
}

// !Get all Order From Database

const getAllOrderIntoDB = async (userEmail?: string) => {
  if (!userEmail) {
    const result = await OrderModel.find()
    return result
  }
  // !find Order By UserEmail
  const result = await OrderModel.aggregate([
    {
      $match: { email: userEmail },
    },
  ])
  return result
}

export const orderServices = {
  saveOrderIntoDB,
  getAllOrderIntoDB,
}
