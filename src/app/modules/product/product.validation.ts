import { z } from 'zod'

export const productValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be string',
    })
    .min(0, 'Name is required'),
  description: z
    .string({
      invalid_type_error: 'Description must be string',
    })
    .min(1, 'Description is required'),
  price: z
    .number({
      invalid_type_error: 'Price must be Number',
      required_error: 'Price is required',
    })
    .positive('Price must be a positive number'),
  category: z
    .string({
      invalid_type_error: 'Category must be String',
    })
    .min(1, 'Category is required'),
  tags: z
    .array(
      z.string({
        invalid_type_error: 'Tags must be String',
      }),
    )
    .nonempty('Tags is required'),
  variants: z
    .array(
      z.object({
        type: z
          .string({
            invalid_type_error: 'Product variants Type must be String',
            required_error: 'Product variants Type is required',
          })
          .min(1, 'Product variants Type is required'),

        value: z
          .string({
            invalid_type_error: 'Product variants value must be String',
            required_error: 'Product variants value is required',
          })
          .min(1, 'Product variants value is required'),
      }),
    )
    .nonempty('Variants is required'),
  inventory: z.object({
    quantity: z
      .number({
        invalid_type_error: 'Product Quantity must be Number',
        required_error: 'Product Quantity  is required',
      })
      .min(1, 'Quantity must be a non-negative number and minimum 1'),
    inStock: z.boolean(),
  }),
})
