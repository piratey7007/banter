import React, { useContext } from 'react'
import { AuthContext } from '../utils/Auth'

const GoogleButton = ({ text }) => {
	const { googleSignIn, setPending } = useContext(AuthContext)

	const handleGoogleSignIn = async (e) => {
		e.preventDefault()
		setPending('Signing in with Google...')
		await googleSignIn()
	}
	return (
		<button
			className="flex gap-2 bg-blue-500 hover:bg-blue-700 py-2 px-2 rounded-lg transition-colors duration-200"
			onClick={handleGoogleSignIn}
		>
			<svg className="h-full w-14 aspect-square">
				<use href="#google-icon" />
			</svg>
			<span className="font-bold whitespace-nowrap flex justify-center items-center">{text}</span>
		</button>
	)
}

export default GoogleButton
