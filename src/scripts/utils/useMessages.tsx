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
import {
  Dispatch,
  EffectCallback,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AuthContext } from './Auth'
import { db } from './firebaseInfo'
import { MessageI } from '../components/Message'

export default function useMessages(id: string) {
  const [messages, setMessages]: [
    MessageI[],
    Dispatch<SetStateAction<MessageI[]>>,
  ] = useState<MessageI[]>([])
  const { user } = useContext(AuthContext)

  const getMessages: (add?: number) => void = async (add?: number) => {
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
        })) as MessageI[]
        setMessages(messages)
      },
    )
  }

  const addMessage = async (message: MessageI) => {
    try {
      const date = new Date()
      const dateMs =
        date.getTime() as unknown as PartialWithFieldValue<DocumentData>
      const timestamp = Timestamp.fromDate(date)
      await setDoc(doc(db, 'conversations', id, 'messages'), dateMs, {
        ...message,
      } as SetOptions)
      await setDoc(doc(db, 'conversations', id, 'lastMessage'), {
        sender: user?.uid,
        message,
        timestamp,
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  useEffect(() => getMessages, [])

  return [messages, getMessages, addMessage]
}
