import { Link } from 'react-router-dom'
import useChats from '../utils/useChats'
import ChatPreview from './ChatPreview'

export default function ChatList({}: { className?: string }) {
	const [chats] = useChats() as any[]
	return (
		<div className='chat-list w-[37%]'>
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
