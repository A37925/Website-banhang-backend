const User = require('../models/UserModel')
//Mã hóa bằng bcrypt
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require('./JwtSevice')

const createUser = (newUser) => {
  return new Promise(async(resolve, reject) => {
    const { name, email, password, confirmPassword, phone} = newUser
    try {
      const checkUser = await User.findOne({
        email : email
      })
      if(checkUser !== null){
        resolve({
          status: 'OK',
          message:'The email is already'
        })
      }
      //Mã hóa băm mật khẩu
      const hash = bcrypt.hashSync(password, 10)
      const createdUser = await User.create({
        name, 
        email, 
        password:hash, 
        confirmPassword:hash, 
        phone
      })
      if(createdUser){
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data:createdUser
        })
      }
    } catch(e){
      reject(e);
    }
  })
} 

const loginUser = (userLogin) => {
  return new Promise(async(resolve, reject) => {
    const {email, password} = userLogin
    try {
      const checkUser = await User.findOne({
        email : email
      })
      if(checkUser === null){
        resolve({
          status: 'OK',
          message:'The user is not defined'
        })
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password)
      console.log('compare Password: ',comparePassword)
      
      if(!comparePassword){
        resolve({
          status: 'OK',
          message: 'The password or user is incorrect'
        })
      }

      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        access_token,
        refresh_token
      })
    } catch(e){
      reject(e);
    }
  })
} 

const updateUser = (id, data) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id : id
      })

      if(checkUser === null){
        resolve({
          status: 'OK',
          message:'The user is not defined'
        })
      }
      
      const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
      console.log('updatedUser',updatedUser)
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedUser
      })
    } catch(e){
      reject(e);
    }
  })
} 

const deleteUser = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id : id
      })

      if(checkUser === null){
        resolve({
          status: 'OK',
          message:'The user is not defined'
        })
      }
      
      const deleteUser = await User.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'Delete USER SUCCESS',
      })
    } catch(e){
      reject(e);
    }
  })
} 

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser
}