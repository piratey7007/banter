import { doc, getDoc } from '@firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utils/Auth'
import { db } from '../utils/firebaseInfo'
import useTimestamp from '../utils/useTimestamp'
import UserImage from './UserImage'

export default function ChatPreview({ chat }) {
	const { lastMessage } = chat
	const { user } = useContext(AuthContext)
	// const [timestamp, getTimestamp] = useTimestamp(lastMessage.timestamp)
	const [sender, setSender] = useState()
	const [chatName, setChatName] = useState()
	if (!lastMessage.senderId) setSender('New Chat')
	else if (lastMessage.senderId == user.uid) setSender('You')
	else getDoc(doc(db, 'users', lastMessage.senderId)).then((doc) => setSender(doc.data().displayName))

	useEffect(() => {
		if (!chat.name) {
			;(async function getChatName() {
				const chatUsers = chat.users.filter((uid) => uid != user.uid)
				const checkedUsernames = []

				// If there's only one user, use their display name
				if (chatUsers.length == 1) return setChatName(await getDisplayName(0))

				// Takes an array of usernames and returns the string that would be displayed
				function getChatString(usernames) {
					const usersRemaining = chatUsers.length - checkedUsernames.length - 1
					const lastUser = usernames.pop()
					switch (usersRemaining) {
						case 0:
							return usernames.length > 1 ? usernames.join(', ') + 'and ' + lastUser : usernames + ' and ' + lastUser
						case 1:
							return [...usernames, lastUser, 'and 1 other...'].join(', ')
						default:
							return [...usernames, lastUser, `and ${usersRemaining} others...`].join(', ')
					}
				}

				// Add users to the chat name until it's too long
				for (let i = 0; i < chatUsers.length && i < 4; i++) {
					if (chat.users[i] != user.uid) {
						const { displayName } = await getDisplayName(i)
						if (getChatString([...checkedUsernames, displayName]).length < 40) {
							checkedUsernames.push(displayName)
						} else break
					}
				}

				setChatName(getChatString(checkedUsernames))

				// Gets the display name of a user
				async function getDisplayName(n) {
					return (await getDoc(doc(db, 'users', chatUsers[n]))).data().displayName
				}
			})()
		} else {
			setChatName(chat.name.length > 40 ? chat.name.slice(0, 40) + '...' : chat.name)
		}
	}, [])

	return (
		<div className='chat-preview flex items-stretch gap-5 px-5 py-3 h-28 bg-secondary rounded-lg shadow-[inset_0_-2px_8px_2px_#000000a0] hover:brightness-125 transition-all duration-200'>
			<div className='w-[4.5rem] flex items-center'>
				<UserImage colors={chat.defaultColors} url={chat.photoURL} />
			</div>
			<div className='w-full relative text-sm flex flex-col gap-2'>
				<h3 className='font-[Vidaloka] text-base'>{chatName}</h3>
				{(chat.lastMessage && (
					<>
						<div className='gap-1'>
							{sender && (
								<p className='opacity-60 max-w-[38ch]'>
									<strong>{sender}: </strong>
									{lastMessage.content.length + sender.length > 70
										? lastMessage.content.slice(0, 70 - sender.length) + '...'
										: lastMessage.content}
								</p>
							)}
						</div>
						{/* <span className='absolute right-0 bottom-0 text-xs opacity-50'>{timestamp}</span> */}
					</>
				)) || <p>Tap to start the conversation!</p>}
			</div>
		</div>
	)
}
