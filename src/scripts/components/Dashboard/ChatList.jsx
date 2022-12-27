import React from 'react'
import ChatListItem from './ChatListItem'
import { Link } from 'react-router-dom'

export default function ChatList({ chats, user, updateChats }) {
	return (
		<ul className="w-full px-8 max-w-xl">
			{chats && chats.map((chat) => <ChatListItem key={chat.id} chat={chat} user={user} updateChats={updateChats} />)}
		</ul>
	)
}
