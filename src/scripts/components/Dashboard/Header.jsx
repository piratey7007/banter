import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '/src/scripts/utils/Auth'
import { Link } from 'react-router-dom'
import Tooltip from '/src/scripts/components/Tooltip'
import DefaultImage from '../DefaultImage'
import MyProfile from '../../pages/MyProfile'

export default function Header({ pushCard }) {
	const { signOut, user } = useContext(AuthContext)
	const [image, setImage] = useState()
	useEffect(() => {
		// IIFE to get and set user image or default image
		if (!user) return
		;(async () => {
			if (!user.photoURL) return null
			console.warn('User Image returns null. Please fix this in the future. (See line 20 in Header.jsx)')
			return null
			return user.photoURL
		})().then((res) => setImage(res))
	}, [user])

	return (
		<header className="sticky flex justify-between px-4 pt-4 w-full">
			<Tooltip content={user?.displayName}>
				<div onClick={() => pushCard(<MyProfile />)}>
					{image && (
						<img
							src={image}
							alt="Profile"
							referrerPolicy="no-referrer"
							className="cursor-pointer w-20 aspect-square rounded-xl overflow-hidden"
						/>
					)}
					{!image && <DefaultImage colors={[user?.defaultPhotoColor]} />}
				</div>
			</Tooltip>
			<svg>
				<use href="#banter-logo-full" />
			</svg>
			<button onClick={async () => await signOut()}>Sign Out</button>
		</header>
	)
}
