import { z } from 'zod'

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string(),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, 'Price must be a non-negative number'),
  quantity: z
    .number({
      invalid_type_error: 'Order Quantity must be Number',
      required_error: 'Order Quantity  is required',
    })
    .min(1, 'Minimum Quantity 1 '),
})
