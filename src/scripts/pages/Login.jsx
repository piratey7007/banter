import React, { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../utils/Auth'
import Card from '../components/Card'
import GoogleButton from '../components/GoogleButton'

const Login = () => {
	const username = useRef('')
	const password = useRef('')
	const { user, googleSignUp, googleSignIn, signIn, setLoading, error, setError } = useContext(AuthContext)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError()
		if (username.current.value.trim() === '' || password.current.value.trim() === '')
			return setError('Please fill in all fields')
		setLoading((prev) => prev + 1)
		await signIn(username.current.value, password.current.value)
		setLoading((prev) => prev - 1)
	}

	return (
		<Card className="login">
			<h1>Login</h1>
			{error && (
				<p className="bg-error-200 text-error-500 p-4 rounded-sm border-error-100 border-2 shadow w-full">{error}</p>
			)}
			<form onSubmit={handleSubmit} action="login">
				<input type="text" name="username" ref={username} placeholder="Username/Email" />
				<input type="password" name="password" ref={password} placeholder="Password" />
				<button type="submit" value="Login">
					Login
				</button>
			</form>
			<Link to="/signup">Need an account?</Link>
			<GoogleButton />
		</Card>
	)
}

export default Login
