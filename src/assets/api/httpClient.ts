import axios from 'axios'
const BASE_URL = 'http://82.202.204.94/tmp/test.php'

const httpClient = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true
})

export { httpClient }