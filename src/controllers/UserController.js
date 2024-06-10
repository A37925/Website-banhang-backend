const UserSevice = require('../services/UserSevices')

const createUser = async (req, res) => {
  try {
      console.log(req.body)
      const { name, email, password, confirmPassword, phone} = req.body
      
      if( !name || !email || !password || !confirmPassword || !phone){
        return res.status(200).json({
          status: 'ERR',
          message: 'The input is required'
        })
      }
      const res = await UserSevice.createUser()
      return res.status(200).json(res)
  } catch(e){
      return res.status(404).json({
        message: e
      })
  }
}

module.exports = {
  createUser
}