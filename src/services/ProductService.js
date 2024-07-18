const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
  return new Promise(async(resolve, reject) => {
    const { name, image, type, price, coutInStock, rating, description} = newProduct

    try {
      const checkProduct = await Product.findOne({
        name : name
      })
      if(checkProduct !== null){
        resolve({
          status: 'OK',
          message:'The name of product is already'
        })
      }
      const createProduct = await Product.create({
        name, image, type, price, coutInStock, rating, description
      })
      if(createProduct){
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data:createProduct
        })
      }
    } catch(e){
      reject(e);
    }
  })
} 

const updateProduct = (id, data) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id : id
      })

      if(checkProduct === null){
        resolve({
          status: 'OK',
          message:'The product is not defined'
        })
      }
      
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
      console.log('updatedProduct',updatedProduct)
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedProduct
      })
    } catch(e){
      reject(e);
    }
  })
} 

const getDetailsProduct = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id : id
      })

      if(product === null){
        resolve({
          status: 'OK',
          message:'The product is not defined'
        })
      }
      
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: product
      })
    } catch(e){
      reject(e);
    }
  })
} 

const deleteProduct = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id : id
      })

      if(checkProduct === null){
        resolve({
          status: 'OK',
          message:'The Product is not defined'
        })
      }
      
      await Product.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'Delete Product SUCCESS',
      })
    } catch(e){
      reject(e);
    }
  })
} 

const getAllProduct = (limit = 2, page = 1) => {
  console.log(limit)
  return new Promise(async(resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments()
      const allProduct = await Product.find().limit(limit).skip(page * limit)
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        //tính tổng số trang. ceil (làm tròn lên)
        totalPage: Math.ceil(totalProduct / limit)
      })
    } catch(e){
      reject(e);
    }
  })
} 


module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct
}