import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  RefObject,
  useRef,
  useState,
} from 'react'

interface ChatroomProps {
  chatroomRef: RefObject<HTMLDivElement>
  addMessage: (message: string) => Promise<void>
}

export default function ChatroomInput({
  chatroomRef,
  addMessage,
}: ChatroomProps) {
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
      onSubmit={handleSend}
      action='send_message'
    >
      <div
        className='py-3 px-4 flex flex-col flex-grow [overflow-wrap:break-word] bg-black rounded-2xl placeholder:text-white placeholder:opacity-60 focus-visible:outline-none hover:ring-2 focus-visible:ring-4 ring-white ring-opacity-20 transition-[box-shadow] duration-100'
        ref={mainRef}
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            if (e.shiftKey) return
            e.preventDefault()
            handleSend()
          }
        }}
      >
        <Span type='' />
      </div>
      <button onClick={handleSend} type='submit'>
        Send
      </button>
    </form>
  )
}

// Path: src/scripts/components/Span.tsx

function Span({ type, children }: { type: string; children?: JSX.Element[] }) {
  return (
    <SurroundingTag type={type}>
      <span
        contentEditable
        suppressContentEditableWarning
        className='outline-none'
      >
        {children}

        <br />
      </span>
    </SurroundingTag>
  )
}

function SurroundingTag({
  type,
  children,
}: {
  type: string
  children: JSX.Element | JSX.Element[]
}) {
  switch (type) {
    case 'bold':
      return <b>{children}</b>
    case 'italic':
      return <i>{children}</i>
    case 'underline':
      return <u>{children}</u>
    case 'strikethrough':
      return <s>{children}</s>
    default:
      return <>{children}</>
  }
}
