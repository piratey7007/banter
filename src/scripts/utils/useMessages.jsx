import { collection, limit, onSnapshot, orderBy, query, Timestamp, documentId, doc, setDoc } from '@firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Auth'
import { db } from './firebaseInfo'

export default function useMessages(id) {
	const [messages, setMessages] = useState([])
	const { user } = useContext(AuthContext)

	const getMessages = (add) => {
		add = add ?? 20
		onSnapshot(
			query(
				collection(db, 'conversations', id, 'messages'),
				orderBy(documentId(), 'asc'),
				limit(messages.length + add),
			),
			(snapshot) => {
				const messages = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setMessages(messages)
			},
		)
	}

	const addMessage = async (message) => {
		try {
			const date = new Date()
			const dateMs = date.getTime()
			const timestamp = Timestamp.fromDate(date)
			await setDoc(doc(db, 'conversations', id, 'messages', dateMs), { ...message })
			await setDoc(doc(db, 'conversations', id, 'lastMessage'), { sender: user.uid, message, timestamp })
		} catch (e) {
			console.error('Error adding document: ', e)
		}
	}

	useEffect(getMessages, [])

	return [messages, getMessages, addMessage]
}
