import axios from 'axios'

axios.defaults.baseURL = 'https://api-test.sesametime.com/'
axios.defaults.headers.common = {'Authorization': 'Bearer 16e2f0694a311151c01aa0a131b94a5a3ad7f110e12c2d8f459fcbb158214f5f'}

export default axios;
