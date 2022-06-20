import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Auth } from '../features/auth/auth'
// import { useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    /* eslint-disable no-alert */
    // const navigate = useNavigate()

    async function handleLogin(evt) {
        evt.preventDefault()
        try {
            await Auth.login({ username, password })
            window.location.href = '/blogs'
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username" value={username} onChange={({ target }) => setUsername(target.value)} /><br />
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" value={password} onChange={ ({ target }) => setPassword(target.value) } /><br />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

PropTypes.Login = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
}

export default Login