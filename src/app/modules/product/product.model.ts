import { Schema, model } from 'mongoose'
import { Inventory, Product, Variant } from './product.interface'

const varientSchema = new Schema<Variant>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
)

const inventorySchema = new Schema<Inventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
)

// !Product Schema
const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: [varientSchema],
  inventory: {
    type: inventorySchema,
    required: true,
  },
})

// !Export Product Model

export const StudentModel = model<Product>('Student', productSchema)
