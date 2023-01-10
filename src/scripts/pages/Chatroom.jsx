import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../utils/Auth'
import useMessages from '../utils/useMessages'
import Message from '../components/Message'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../utils/firebaseInfo'
import ChatroomInput from '../components/ChatroomInput'

export default function Chatroom({ className, ...props }) {
	const { id } = useParams()
	const chatroomRef = useRef()
	const { user } = useContext(AuthContext)
	const [messages, getMessages, addMessage] = useMessages(id)
	const myClasses = ``
	const theirClasses = ``
	useEffect(() => {
		;(async () => {
			await getMessages()
			setTimeout(() => {
				chatroomRef.current.scrollTo(0, chatroomRef.current.scrollHeight)
			}, 2000)
		})()
	}, [])

	const images = new Map([[user.uid, { photoURL: user.photoURL, defaultColors: user.defaultColors }]])

	const getSenderPhoto = async (sender) => {
		if (!sender) return {}
		if (images.has(sender)) return images.get(sender)
		let photo
		if (sender == user.uid) photo = { photoURL: user.photoURL, defaultColors: user.defaultColors }
		else {
			const doc = await getDoc(doc(db, 'users', sender))
			photo = { photoURL, defaultColors } = doc.data()
		}
		images.set(sender, photo)
		return photo
	}

	return (
		<div
			ref={chatroomRef}
			className={className + ' relative h-full max-h-full flex flex-col justify-between'}
			{...props}
		>
			<header className='w-full bg-primary rounded-bl-2xl p-4'>
				<h1>Sender</h1>
			</header>
			<div className='overflow-y-auto overflow-x-hidden flex-grow max-h-full'>
				{messages &&
					messages.map((message) => {
						return (
							<Message
								key={message.id}
								message={{
									senderPhoto: images.get(message.sender) || null,
									getSenderPhoto,
									conversation: id,
									...message,
								}}
							/>
						)
					})}
			</div>
			<footer className='bottom-0 right-0 w-full rounded-tl-2xl bg-primary p-4'>
				<ChatroomInput chatroomRef={chatroomRef} addMessage={addMessage} />
			</footer>
		</div>
	)
}
