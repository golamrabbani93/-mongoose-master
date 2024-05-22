import { z } from 'zod'

export const productValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name is required',
    })
    .min(1, { message: 'Name is required And Name must be string' }),
  description: z
    .string({
      invalid_type_error: 'Description must be string',
      required_error: 'Description is required',
    })
    .min(1, { message: 'Description is required' }),
  price: z
    .number({
      invalid_type_error: 'Price must be Number',
      required_error: 'Price is required',
    })
    .positive('Price must be a positive number'),
  category: z
    .string({
      invalid_type_error: 'Category must be String',
      required_error: 'Category is required',
    })
    .min(1, { message: 'Category is required' }),
  tags: z.array(
    z
      .string({
        invalid_type_error: 'Tags must be String',
        required_error: 'Tags is required',
      })
      .min(1, { message: 'At least one tag is required' }),
    {
      invalid_type_error: 'Tags must be String',
      required_error: 'Tags is required',
    },
  ),
  variants: z.array(
    z.object({
      type: z
        .string({
          invalid_type_error: 'Product variants Type must be String',
          required_error: 'Product variants Type is required',
        })
        .min(1, {
          message: 'At least one Product variants Type is required',
        }),

      value: z
        .string({
          invalid_type_error: 'Product variants value must be String',
          required_error: 'Product variants value is required',
        })
        .min(1, {
          message: 'At least one Product variants value is required',
        }),
    }),
    {
      required_error: 'variants is required',
    },
  ),
  inventory: z.object(
    {
      quantity: z
        .number({
          invalid_type_error: 'Product Quantity must be Number',
          required_error: 'Product Quantity  is required',
        })
        .min(1, {
          message: 'Quantity must be a non-negative number and minimum 1',
        }),
      inStock: z.boolean(),
    },
    {
      required_error: 'inventory is required',
    },
  ),
})
