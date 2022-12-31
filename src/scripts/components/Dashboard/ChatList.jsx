import React from 'react'
import ChatListItem from './ChatListItem'

export default function ChatList({ chats, updateChats }) {
	return (
		<ul className="w-[30em] px-8 max-w-full">
			{chats && chats.map((chat) => <ChatListItem key={chat.id} chat={chat} updateChats={updateChats} />)}
		</ul>
	)
}
