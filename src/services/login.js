import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentialsLogin => {
  const credentials = {
    username: credentialsLogin.usernameLogin,
    password: credentialsLogin.passwordLogin
  }
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
