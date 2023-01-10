import React, { useContext } from 'react'
import { AuthContext } from '../utils/Auth'

export default function Profile() {
	const { id } = useParams()
	const { user } = useContext(AuthContext)

	if (id === user.uid) return <MyProfile />

	return (
		<div>
			<h1>Profile</h1>
		</div>
	)
}
