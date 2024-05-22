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
const updateProductIntoDB = async (
  productId: string,
  updateProductDoc: Product,
) => {
  // ! Get Matched Product By Product Id
  const result = await ProductModel.findOne({ _id: productId })
  const databaseProductId = result?._id.toString()

  if (databaseProductId === productId) {
    // ! find Product By id And Update
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateProductDoc,
      {
        new: true,
        overwrite: true,
        runValidators: true,
      },
    )
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
