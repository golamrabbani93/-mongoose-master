import { z } from 'zod'

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string(),
  price: z
    .number({
      invalid_type_error: 'Price must be Number',
      required_error: 'Price is required',
    })
    .positive('Price must be a positive number'),
  quantity: z
    .number({
      invalid_type_error: 'Order Quantity must be Number',
      required_error: 'Order Quantity  is required',
    })
    .min(1, 'Minimum Quantity 1 '),
})
