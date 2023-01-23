import { Link } from 'react-router-dom'
import useChats from '../utils/useChats'
import ChatPreview from './ChatPreview'

export default function ChatList({className}: { className?: string }) {
	const [chats] = useChats() as any[]
	className = 'chat-list ' + className
	return (
		<div className={className}>
			{chats &&
				chats.map((chat: any) => {
					return (
						<Link key={chat.id} to={`chatroom/${chat.id}`}>
							<ChatPreview key={chat.id} chat={chat} />
						</Link>
					)
				})}
		</div>
	)
}
