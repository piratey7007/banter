import React, { useRef, useState, useContext, useEffect } from 'react'
import { AuthContext } from '../utils/Auth'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import StatusAlert from '../components/StatusAlert'
import GoogleButton from '../components/GoogleButton'
import DefaultImage from '../components/DefaultImage'

const Signup = () => {
	const email = useRef('')
	const username = useRef('')
	const password = useRef('')
	const confirmPassword = useRef('')
	const age = useRef('')
	const bio = useRef('')
	const birthday = useRef('')
	const avatar = useRef('')
	const [card, setCard] = useState('signup')
	const { signup, status } = useContext(AuthContext)
	const [error, setError] = useState(null)

	const handleSignup = async (e) => {
		e.preventDefault()
		if (
			username.current.value.trim() === '' ||
			password.current.value.trim() === '' ||
			confirmPassword.current.value.trim() === '' ||
			email.current.value.trim() === ''
		)
			return setError('Please fill in all fields')
		if (username.current.value.length < 3) return setError('Username must be at least 3 characters')
		if (password.current.value.length < 8) return setError('Password must be at least 8 characters')
		if (
			!email.current.value.includes('@') ||
			!email.current.value.includes('.') ||
			email.current.value.indexOf('@') > email.current.value.indexOf('.')
		)
			return setError('Please enter a valid email address')
		if (password.current.value !== confirmPassword.current.value) return setError('Passwords do not match')
		await signup()
	}

	const handleInfo = async (e) => {
		e.preventDefault()
	}

	const signupCard = (
		<Card className="signup">
			<h1>Sign Up</h1>
			{(error || status?.error || status?.pending || status?.success) && (
				<StatusAlert status={error ? { error } : status} />
			)}
			<form onSubmit={handleSignup} action="signup">
				<input type="email" name="email" ref={email} placeholder="Email" />
				<input type="text" name="username" ref={username} placeholder="Username" />
				<input type="password" name="password" ref={password} placeholder="Password" />
				<input type="password" name="confirm-password" ref={confirmPassword} placeholder="Confirm Password" />
				<button type="submit" value="Sign up">
					Login
				</button>
			</form>
			<Link to="/signup">Already have an account?</Link>
			<GoogleButton text="Sign up with Google" />
		</Card>
	)

	const infoCard = (
		<Card className="info">
			<h1>Info</h1>
			<form onSubmit={handleInfo} action="info">
				<div className="avatar">
					{<DefaultImage />}
					<input type="file" name="avatar" ref={avatar} placeholder="Avatar" />
					<select name="Default Color" id="default-color">
						<option value="maroon">Maroon</option>
						<option value="aqua">Aqua</option>
						<option value="forestgreen">Forest Green</option>
						<option value="fuchsia">Fuchsia</option>
						<option value="teal">Teal</option>
					</select>
				</div>
				<div>
					<input type="range" name="age" ref={age} placeholder="Age" />
					<span>
						<svg className="-rotate-90">
							<use href="#arrow" />
						</svg>
					</span>
				</div>
				<input type="date" name="birthday" ref={birthday} placeholder="Birthday" />
				<input type="text" name="bio" ref={bio} placeholder="Bio" />
				<button type="submit" value="Sign up">
					Submit
				</button>
			</form>
		</Card>
	)

	return <>{card === 'signup' ? signupCard : card === 'info' ? infoCard : <></>}</>
}

export default Signup
