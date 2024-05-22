import { ProductModel } from '../product/product.model'
import { productServices } from '../product/product.services'
import { Order } from './order.interface.'
import { OrderModel } from './order.model'

// ! Save Order In databse
const saveOrderIntoDB = async (orderData: Order) => {
  // !get Product id and quantity
  const { productId, quantity } = orderData

  // !get Matched Product By Order Product Id
  const dbProduct = await productServices.getSingleProductIntoDB(productId)
  if (!dbProduct) {
    const message: string = 'not Found'
    return message
  }
  // !  Get Matched Product Id And Quantity
  const prevQuantity = dbProduct?.inventory?.quantity as number
  const databaseProductId = dbProduct?._id.toString() as string

  if (prevQuantity >= quantity && databaseProductId === productId) {
    // ! If Product Quantity Available the user create new order
    const createdOrder = await OrderModel.create(orderData)

    // ! find Product By id And Update Quantity
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { 'inventory.quantity': prevQuantity - quantity },
      { new: true },
    )
    // !when Updated Product quantity 0 then update Instock property false
    if ((updatedProduct?.inventory.quantity as number) === 0) {
      await ProductModel.findByIdAndUpdate(
        productId,
        { 'inventory.inStock': false },
        { new: true },
      )
    }
    return createdOrder
  } else {
    const success: boolean = false
    return success
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
