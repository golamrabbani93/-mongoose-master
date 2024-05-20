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

export const productServices = {
  saveProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
}
