import { Product } from './product.interface'
import { ProductModel } from './product.model'

// ! Save Product In databse
const saveProductIntoDB = async (productData: Product) => {
  const result = await ProductModel.create(productData)
  return result
}

// ! Get All Products From Database
const getAllProductIntoDB = async (searchTerm?: string) => {
  // ! if serach Term not Found Send All Products
  if (!searchTerm) {
    const result = await ProductModel.find()
    return result
  }
  //   !create Pipeline for matching Products
  const pipeline = [
    {
      $match: {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } },
        ],
      },
    },
  ]
  // ! Aggregate and get matching products
  const result = await ProductModel.aggregate(pipeline)
  return result
}

// ! Get Single Product by ID From Database
const getSingleProductIntoDB = async (productID: string) => {
  const result = await ProductModel.findOne({ _id: productID })
  return result
}

// ! Update Product Quantity by ID From Database
const updateProductIntoDB = async (productID: string, quantity: number = 1) => {
  // ! Get Previous Product Quantity
  const result = await ProductModel.findOne({ _id: productID })
  const prevQuantity = result?.inventory.quantity as number
  const databaseProductId = result?._id.toString()

  if (prevQuantity >= quantity && databaseProductId === productID) {
    // ! find Product By id And Update Quantity
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      { 'inventory.quantity': prevQuantity - quantity },
      { new: true },
    )

    if ((updatedProduct?.inventory.quantity as number) === 0) {
      await ProductModel.findByIdAndUpdate(
        productID,
        { 'inventory.inStock': false },
        { new: true },
      )
    }
    return updatedProduct
  } else {
    const success: boolean = false
    return success
  }
}

// ! Delete Single Product by ID From Database
const deleteSingleProductIntoDB = async (productID: string) => {
  const result = await ProductModel.deleteOne({ _id: productID })
  return result
}

export const productServices = {
  saveProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  deleteSingleProductIntoDB,
}
