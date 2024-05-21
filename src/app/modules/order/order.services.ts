import { Order } from './order.interface.'
import { OrderModel } from './order.model'

// ! Save Order In databse
const saveOrderIntoDB = async (orderData: Order) => {
  const result = await OrderModel.create(orderData)
  return result
}

export const orderServices = {
  saveOrderIntoDB,
}
