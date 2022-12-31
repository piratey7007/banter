import React, { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../utils/Auth'
import Card from '../components/Card'
import StatusAlert from '../components/StatusAlert'
import GoogleButton from '../components/GoogleButton'

const Login = () => {
	const username = useRef('')
	const password = useRef('')
	const confirmPassword = useRef('')
	const email = useRef('')
	const { signIn, loading: userLoading, status, setError } = useContext(AuthContext)

	const handleLogin = async (e) => {
		e.preventDefault()
		if (username.current.value.trim() === '' || password.current.value.trim() === '')
			return setError('Please fill in all fields')
		await signIn(username.current.value, password.current.value)
	}

	return (
		<Card className="login">
			<h1>Login</h1>
			{status && <StatusAlert status={status} />}
			<form onSubmit={handleLogin} action="login">
				<input type="text" name="username" ref={username} placeholder="Username/Email" />
				<input type="password" name="password" ref={password} placeholder="Password" />
				<Link to="/signup">Need an account?</Link>
				<button type="submit" value="Login">
					Login
				</button>
			</form>
			<GoogleButton text="Login with Google" />
		</Card>
	)
}

export default Login
