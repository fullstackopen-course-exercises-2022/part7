import axios from 'axios'
// import { Auth } from '../auth/auth'
const { REACT_APP_BLOG_URL } = process.env

// const user = Auth.getCurrentUser()
// const config = {
//     headers: { Authorization: `Bearer ${user.token}` }
// }

const getUsers = async () => {
    const response = await axios.get(`${REACT_APP_BLOG_URL}/api/users`)
    return response.data
}

export const Users = {
    getUsers
}