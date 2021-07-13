import axios from 'axios'

let verifyToken = async (userId, userType, token) => {
    try {
      const response = await axios.post('http://localhost:3010/verifyUserToken',
          {
            userId: userId, 
            userType: userType,
            token: token
          }
          );
  
          return response.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

export {
    verifyToken
}