import { collection, documentId, getDocs, limit, onSnapshot, orderBy, query, where } from '@firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Auth'
import { db } from './firebaseInfo'

export default function useChats() {
	const [chats, setChats] = useState([])
	const { user } = useContext(AuthContext)
	const getConversations = (add) => {
		add = add ?? 10
		onSnapshot(
			query(
				collection(db, 'conversations'),
				where('users', 'array-contains', user.uid),
				orderBy('lastMessage.timestamp', 'desc'),
				limit(chats.length + add),
			),
			(snapshot) => {
				const conversations = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setChats(conversations)
			},
		)
	}
	useEffect(() => {
		if (!user) return
		getConversations()
		return
	}, [user])
	return [chats, getConversations]
}
