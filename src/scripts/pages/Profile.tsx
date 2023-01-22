import React, { useContext } from 'react'
import { useParams } from 'react-router'
import MyProfile from '../components/MyProfile'
import { AuthContext } from '../utils/Auth'

export default function Profile({}: { className?: string }) {
	const { id } = useParams()
	const { user } = useContext(AuthContext)

	if (user && id === user.uid) return <MyProfile />

	return (
		<div>
			<h1>Profile</h1>
		</div>
	)
}
