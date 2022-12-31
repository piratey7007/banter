import React, { useContext, useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utils/Auth'
import DefaultImage from '../DefaultImage'

function timeSince(date) {
	if (!date) return null
	const d = new Date() - date.toDate()
	return (
		(d < 1000
			? 'Just now'
			: d < 60000
			? `${Math.floor(d / 15000)} seconds`
			: d < 3600000
			? `${Math.floor(d / 60000)} minutes`
			: d < 86400000
			? `${Math.floor(d / 3600000)} hours`
			: d < 604800000
			? `${Math.floor(d / 86400000)} days`
			: d < 2419200000
			? `${Math.floor(d / 604800000)} weeks`
			: d < 29030400000
			? `${Math.floor(d / 2419200000)} months`
			: `${Math.floor(d / 29030400000)} years`) + ' ago'
	)
}

function getUsersTitle(users, uid) {
	let array = users.filter(({ id }) => id !== uid).map(({ displayName }) => displayName)
	if (array.length > 2) {
		array = array.slice(0, 2)
		return array.join(', ') + (users.length - 2 > 1 ? `, and ${users.length - 2} others` : ', and 1 other')
	}
	if (array.length === 1) return array[0]
	return array[0] + ' and ' + array[1]
}

export default function ChatListItem({ chat, updateChats }) {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()
	const [lastMessage, setLastMessage] = useState(chat.lastMessage)
	const [timestamp, setTimestamp] = useState(timeSince(chat.lastMessage?.timestamp))
	let content, sender
	if (chat.lastMessage) {
		sender = chat.lastMessage.sender.id === user.uid ? 'You' : chat.lastMessage.sender.displayName
		if (chat.lastMessage.type === 'image') content = 'Image'
		else {
			content = chat.lastMessage.content
			if (content.length > 25) content = content.slice(0, 25) + '...'
		}
	} else {
		content = 'No messages yet. Tap to start a conversation!'
	}
	const chatTitle = chat.title || 'Chat with ' + getUsersTitle(chat.users, user.uid)
	async function handleTrash() {
		await deleteDoc(doc(db, 'conversations', chat.id))
		await updateChats()
	}
	function handleLink() {
		navigate(`/chat/${chat.id}`)
	}

	return (
		<li
			onClick={handleLink}
			className="relative flex justify-between shadow-[inset_0_-1px_3px_0_#ffffff30] bg-secondary rounded-md p-2 cursor-pointer hover:brightness-125 transition-all duration-200"
		>
			{(chat.image && <img src={chat.image} alt="Chat image" className="w-12 h-12 rounded-full mr-2" />) || (
				<DefaultImage />
			)}
			<div className="flex flex-col mb-4">
				<h2 className="font-bold">{chatTitle}</h2>
				<h3 className="font-bold opacity-70 pr-1">{sender ? sender + ':' : ''}</h3>
				<span className="opacity-70">{content}</span>
			</div>
			<span className="absolute bottom-1 right-1 text-xs opacity-70">{timestamp}</span>
		</li>
	)
}
