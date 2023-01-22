import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
	documentId,
	doc,
	setDoc,
	PartialWithFieldValue,
	DocumentData,
	SetOptions,
} from '@firebase/firestore'
import { Dispatch, EffectCallback, SetStateAction, useContext, useEffect, useState } from 'react'
import { AuthContext } from './Auth'
import { db } from './firebaseInfo'

interface Message {
	id: string
	sender: string
	message: string
	timestamp: Timestamp
}

export default function useMessages(id: string) {
	const [messages, setMessages]: [Message[], Dispatch<SetStateAction<Message[]>>] = useState<Message[]>([])
	const { user } = useContext(AuthContext)

	const getMessages = (add: number) => {
		add = add ?? 20
		onSnapshot(
			query(
				collection(db, 'conversations', id, 'messages'),
				orderBy(documentId(), 'asc'),
				limit(messages.length + add),
			),
			(snapshot) => {
				const messages = snapshot.docs.map(
					(doc) =>
						({
							id: doc.id,
							...doc.data(),
						} as Message),
				)
				setMessages(messages)
			},
		)
	}

	const addMessage = async (message: Message) => {
		try {
			const date = new Date()
			const dateMs = date.getTime() as unknown as PartialWithFieldValue<DocumentData>
			const timestamp = Timestamp.fromDate(date)
			await setDoc(doc(db, 'conversations', id, 'messages'), dateMs, { ...message } as SetOptions)
			await setDoc(doc(db, 'conversations', id, 'lastMessage'), { sender: user?.uid, message, timestamp })
		} catch (e) {
			console.error('Error adding document: ', e)
		}
	}

	useEffect(getMessages as EffectCallback, [])

	return [messages, getMessages, addMessage]
}
