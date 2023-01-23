import { deleteDoc, doc, setDoc } from '@firebase/firestore'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../utils/Auth'
import { db } from '../utils/firebaseInfo'
import useTimestamp from '../utils/useTimestamp'
import UserImage from './UserImage'

export interface MessageI {
  uid: string
  conversation: string
  id: string
  sender: string
  senderPhoto?: {
    photoURL?: string
    defaultColors?: string[] | string
  }
  getSenderPhoto: Function
  content: string
  reply?: MessageI
}

export default function Message({
  message,
  type,
  ...props
}: {
  message: MessageI
  type?: 'reply'
}) {
  // const [timestamp, getTimestamp] = useTimestamp(message.timestamp)
  const { user } = useContext(AuthContext)
  const classes =
    (message.uid == user?.uid ? 'my-message' : 'their-message') +
    (type == 'reply' ? ' reply' : '')

  const handleDeleteMessage = async () => {
    await deleteDoc(
      doc(db, 'conversations', message.conversation, 'messages', message.id),
    )
  }

  // useEffect(getTimestamp, [])

  const { sender, senderPhoto, getSenderPhoto, content, reply } = message

  return (
    <>
      {reply && <Message message={reply} type='reply' />}
      <div
        onMouseOver={() => {
          // getTimestamp()
        }}
        className={classes + ' relative'}
        {...props}
      >
        <div className='photo'>
          <UserImage
            url={senderPhoto?.photoURL}
            colors={senderPhoto?.defaultColors}
          />
        </div>
        <div className='message-content'>
          <p>{content}</p>
          {/* <span>{timestamp}</span> */}
        </div>
        <button
          onClick={handleDeleteMessage}
          className='top-0 right-0 absolute'
        >
          Delete Message
        </button>
      </div>
    </>
  )
}
