import {
  FormEventHandler,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

export default function ChatroomInput({
  chatroomRef,
  addMessage,
}: {
  chatroomRef: RefObject<HTMLDivElement>
  addMessage: Function
}) {
  const mainRef = useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    if (mainRef.current?.innerText.trim() == '') return
    let source = mainRef.current?.innerHTML
    // clean up message
    let message = source!
      .replaceAll(/<br>/g, '\n')
      .replaceAll(/<div>/g, '')
      .replaceAll(/<\/div>/g, '\n')
    chatroomRef.current?.scrollTo(0, chatroomRef.current.scrollHeight)
    if (mainRef.current) mainRef.current.innerHTML = ''
    await addMessage(message)
  }

  return (
    <form
      className='flex gap-12 w-full'
      onSubmit={(e) => {
        e.preventDefault()
        handleSend
      }}
      action='send_message'
    >
      <div
        className='py-3 px-4 flex flex-col flex-grow [overflow-wrap:break-word] bg-black rounded-2xl placeholder:text-white placeholder:opacity-60 focus-visible:outline-none hover:ring-2 focus-visible:ring-4 ring-white ring-opacity-20 transition-[box-shadow] duration-100'
        contentEditable='true'
        ref={mainRef}
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            if (e.shiftKey) return
            e.preventDefault()
            handleSend()
          }
        }}
      ></div>
      <button onClick={handleSend} type='submit'>
        Send
      </button>
    </form>
  )
}
