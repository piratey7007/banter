import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../utils/Auth'
import { collection, getDocs, doc, query, where, limit } from 'firebase/firestore'
import { db } from '../utils/firebase'
import Header from '../components/Dashboard/Header'
import ChatList from '../components/Dashboard/ChatList'

const Dashboard = () => {
	const { user } = useContext(AuthContext)

	const [chats, setChats] = useState(null)
	const [chatsLoaded, setChatsLoaded] = useState(false)
	const [card, setCard] = useState(null)

	async function updateChats(additionalQuery = false) {
		if (additionalQuery) additionalQuery = chats.length + 10
		setChatsLoaded(false)
		const q = query(
			collection(db, 'conversations'),
			where('users', 'array-contains', { displayName: user.displayName, id: user.uid }),
			limit(additionalQuery || 10)
		)
		const querySnapshot = await getDocs(q)
		const conversations = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
		setChats(conversations)
		setChatsLoaded(true)
	}

	useEffect(() => {
		updateChats()
	}, [])

	const pushCard = (card) => setCard(card)

	const LowerCard = ({ children }) => {
		return (
			<div className="w-fit h-fit flex flex-col items-center">
				{children}
				<div className="w-full h-full">{card}</div>
			</div>
		)
	}

	return (
		<div className="w-full h-full flex flex-col items-center">
			<Header pushCard={pushCard} />
			<LowerCard>
				{chatsLoaded && <ChatList chats={chats} updateChats={() => updateChats(true)} />}
				{!chatsLoaded && <ChatList />}
			</LowerCard>
		</div>
	)
}

export default Dashboard
