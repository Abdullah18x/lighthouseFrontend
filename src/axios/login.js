import axios from 'axios'

let url = 'http://localhost:3010'
let adminLogin = async (userName, password) =>{
    try {
        const response = await axios.post(`${url}/admin/login`,
        {
          userName: userName, 
          password: password
        }
        );
        return response.data
      } catch (error) {
        console.log('It failed')
        console.log(error)
        return error
      }
}

let teacherLogin = async (userName, password) =>{
  try {
      const response = await axios.post(`${url}/lecturer/login`,
      {
        userName: userName, 
        password: password
      }
      );
      return response.data
    } catch (error) {
      console.log('It failed')
      console.log(error)
      return error
    }
}

let studentLogin = async (userName, password) =>{
  try {
      const response = await axios.post(`${url}/student/login`,
      {
        userName: userName, 
        password: password
      }
      );
      return response.data
    } catch (error) {
      console.log('It failed')
      console.log(error)
      return error
    }
}



export {
  adminLogin,
  teacherLogin,
  studentLogin
}