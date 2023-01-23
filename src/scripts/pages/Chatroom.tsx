import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../utils/Auth'
import useMessages from '../utils/useMessages'
import Message, { MessageI } from '../components/Message'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../utils/firebaseInfo'
import ChatroomInput from '../components/ChatroomInput'

export default function Chatroom({
  className,
  ...props
}: {
  className?: string
}) {
  const { id } = useParams()
  if (!id) return <div>Chatroom not found</div>
  const chatroomRef = useRef<HTMLDivElement>(null)
  const { user } = useContext(AuthContext)
  const [messages, getMessages, addMessage] = useMessages(id) as [
    MessageI[],
    Function,
    Function,
  ]
  useEffect(() => {
    ;(async () => {
      await getMessages()
      chatroomRef.current?.scrollTo(0, chatroomRef.current.scrollHeight)
    })()
  }, [])

  const images: Map<
    string | undefined,
    { photoURL?: string; defaultColors?: string[] | string }
  > = new Map([
    [
      user?.uid,
      {
        photoURL: user?.photoURL || undefined,
        defaultColors: user?.defaultColors,
      },
    ],
  ])

  const getSenderPhoto = async (sender: string) => {
    if (!sender) return {}
    if (images.has(sender)) return images.get(sender)
    let photo:
      | { photoURL?: string; defaultColors?: string[] | string }
      | undefined
    if (sender == user?.uid && (user.photoURL || user?.defaultColors))
      photo = {
        photoURL: user?.photoURL || undefined,
        defaultColors: user?.defaultColors || undefined,
      }
    else {
      const retrievedDoc = await getDoc(doc(db, 'users', sender))
      const { photoURL, defaultColors } = retrievedDoc.data() as {
        photoURL?: string
        defaultColors?: string[] | string
      }
      photo = { photoURL, defaultColors }
    }
    if (photo) images.set(sender, photo)
    return photo
  }

  return (
    <div
      ref={chatroomRef}
      className={
        className + ' relative h-full max-h-full flex flex-col justify-between'
      }
      {...props}>
      <header className='w-full bg-primary rounded-bl-2xl p-4'>
        <h1>Sender</h1>
      </header>
      <div className='overflow-y-auto overflow-x-hidden flex-grow max-h-full'>
        {messages &&
          messages.map((message: MessageI) => {
            const senderPhoto = images.get(message.sender)
            return (
              <Message
                key={message.id}
                message={{
                  ...message,
                  senderPhoto: {
                    photoURL: senderPhoto?.photoURL,
                    defaultColors: senderPhoto?.defaultColors,
                  },
                  getSenderPhoto,
                  conversation: id,
                }}
              />
            )
          })}
      </div>
      <footer className='bottom-0 right-0 w-full rounded-tl-2xl bg-primary p-4'>
        <ChatroomInput chatroomRef={chatroomRef} addMessage={addMessage} />
      </footer>
    </div>
  )
}
