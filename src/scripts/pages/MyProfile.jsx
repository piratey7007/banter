import React, { useContext } from 'react'
import { AuthContext } from '../utils/Auth'
import { ToastContext } from '../utils/Toast'

export default function MyProfile() {
	const { addToast } = useContext(ToastContext)
	const { user } = useContext(AuthContext)

	return (
		<div className="profile">
			<h1>My Profile</h1>
			<button
				onClick={async () => {
					await navigator.clipboard.writeText(user.uid)
					addToast('Copied to clipboard!')
				}}
				className="flex-shrink-0 bg-primary-700 hover:brightness-150 transition-all duration-200 border-accent-100 text-md text-accent-100 border-2 py-1 px-2 rounded"
			>
				Copy Your Code!
			</button>
		</div>
	)
}
