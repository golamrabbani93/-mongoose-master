import { Product } from './product.interface'
import { ProductModel } from './product.model'

// ! Save Product In databse
const saveProductIntoDB = async (productData: Product) => {
  const result = await ProductModel.create(productData)
  return result
}

// ! Get All Products From Database
const getAllProductIntoDB = async () => {
  const result = await ProductModel.find()
  return result
}

// ! Get Single Product by ID From Database
const getSingleProductIntoDB = async (productID: string) => {
  const result = await ProductModel.findOne({ _id: productID })
  return result
}

// ! Update Product Quantity by ID From Database
const updateProductIntoDB = async (productID: string) => {
  // ! Get Previous Product Quantity
  const result = await ProductModel.findOne({ _id: productID })
  const prevQuantity = result?.inventory.quantity as number

  // ! find Product By id And Update Quantity
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productID,
    { 'inventory.quantity': prevQuantity - 1 },
    { new: true },
  )
  return updatedProduct
}

export const productServices = {
  saveProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
}
