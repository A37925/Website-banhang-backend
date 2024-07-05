const UserSevice = require('../services/UserSevices')

const createUser = async (req, res) => {
  try {
      console.log(req.body)
      const { name, email, password, confirmPassword, phone} = req.body
      // Định nghĩa regex để kiểm tra định dạng email
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const isCheckEmail = reg.test(email)
      if ( !name || !email || !password || !confirmPassword || !phone){
        return res.status(200).json({
          status: 'ERR',
          message: 'The input is required'
        })
      } else if(!isCheckEmail){
          return res.status(200).json({
            status: 'ERR',
            message: 'The input is email'
          })
      } else if(password !== confirmPassword){
          return res.status(200).json({
            status: 'ERR',
            message: 'The password is equal confirmPassword'
          })
      }
      console.log('isCheckEmail', isCheckEmail)
      const response = await UserSevice.createUser(req.body)
      return res.status(200).json(response)
  } catch(e){
      return res.status(404).json({
        message: e
      })
  }
}

const loginUser = async (req, res) => {
  try {
      console.log(req.body)
      const { email, password} = req.body
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const isCheckEmail = reg.test(email)
      if ( !email || !password ){
        return res.status(200).json({
          status: 'ERR',
          message: 'The input is required'
        })
      } else if(!isCheckEmail){
          return res.status(200).json({
            status: 'ERR',
            message: 'The input is email'
          })
      }
      console.log('isCheckEmail', isCheckEmail)
      const response = await UserSevice.loginUser(req.body)
      return res.status(200).json(response)
  } catch(e){
      return res.status(404).json({
        message: e
      })
  }
}

const updateUser = async (req, res) => {
  try {
      const userId = req.params.id
      const data = req.body
      if(!userId) {
        return res.status(200).json({
          status: 'ERR',
          message: 'The userId is required'
        })
      }
      console.log('userId:', userId)
      console.log('data:', data)
      
      const response = await UserSevice.updateUser(userId,data)
      return res.status(200).json(response)
  } catch(e){
      return res.status(404).json({
        message: e
      })
  }
}

const deleteUser = async (req, res) => {
  try {
      const userId = req.params.id
      if(!userId) {
        return res.status(200).json({
          status: 'ERR',
          message: 'The userId is required'
        })
      }
      console.log('userId:', userId)
      const response = await UserSevice.deleteUser(userId)
      
      return res.status(200).json(response)
  } catch(e){
      return res.status(404).json({
        message: e
      })
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser
}