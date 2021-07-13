import axios from 'axios'

// let logOut = async (userId, userType) => {
//     console.log('here')
//     try {
//         const response = await axios.post(`${url}/logout`,
//         {
//           userId: userId, 
//           userType: userType
//         }
//         );
//         return response.data
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }
let url = 'http://localhost:3010'

let logOutAdmin = async (userId, userType, token) => {
    try {
      await axios.delete(`${url}/logout/admin`, {
        headers: {
          Authorization: token
        },
        data: {
            userId: userId, 
            userType: userType
        }
      });
      
    } catch (error) {
      console.log(error)
      return error
      
    }
  }

let logOutTeacher = async (userId, userType, token) => {
    try {
      await axios.delete(`${url}/logout/lecturer`, {
        headers: {
          Authorization: token
        },
        data: {
            userId: userId, 
            userType: userType
        }
      });
      
    } catch (error) {
      console.log(error)
      return error
      
    }
  }

  let logOutStudent = async (userId, userType, token) => {
    try {
      await axios.delete(`${url}/logout/student`, {
        headers: {
          Authorization: token
        },
        data: {
            userId: userId, 
            userType: userType
        }
      });
      
    } catch (error) {
      console.log(error)
      return error
      
    }
  }

export {
    logOutAdmin,
    logOutTeacher,
    logOutStudent
  }
  