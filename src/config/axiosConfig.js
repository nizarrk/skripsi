import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://perja-dishub.mojokertokota.go.id',
    // baseURL: 'http://localhost:8000',
    headers: {
      'authorization': localStorage.getItem('token')
    }
  })
}
