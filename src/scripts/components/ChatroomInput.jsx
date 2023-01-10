import { useEffect, useRef, useState } from 'react'

export default function ChatroomInput({ chatroomRef, addMessage }) {
	const mainRef = useRef()

	const handleSend = async (e) => {
		e.preventDefault()
		if (mainRef.current.innerText.trim() == '') return
		let source = mainRef.current.innerHTML
		// clean up message
		let message = source
			.replaceAll(/<br>/g, '\n')
			.replaceAll(/div/g, '')
			.replaceAll(/<\/div>/g, '\n')
		chatroomRef.current.scrollTo(0, chatroomRef.current.scrollHeight)
		mainRef.current.innerHTML = ''
		await addMessage(message)
	}

	return (
		<form className='flex gap-12 w-full' onSubmit={handleSend} action='send_message'>
			<div
				className='py-3 px-4 flex flex-col flex-grow [overflow-wrap:break-word] bg-black rounded-2xl placeholder:text-white placeholder:opacity-60 focus-visible:outline-none hover:ring-2 focus-visible:ring-4 ring-white ring-opacity-20 transition-[box-shadow] duration-100'
				rows='auto'
				contentEditable='true'
				ref={mainRef}
				onKeyDown={(e) => {
					if (e.key == 'Enter') {
						if (e.shiftKey) return
						handleSend(e)
					}
				}}
			></div>
			<button onClick={handleSend} type='submit'>
				Send
			</button>
		</form>
	)
}
