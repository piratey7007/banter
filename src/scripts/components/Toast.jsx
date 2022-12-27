import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { ToastContext } from '../utils/Toast'

function Toast({ message }) {
	return (
		<div onAnimationEnd={(e) => e.target.remove()} className="fade-in-out border-primary-700 border-2 p-3">
			<p>{message}</p>
		</div>
	)
}

export const ToastRoot = () => {
	let { toasts } = useContext(ToastContext)

	return ReactDOM.createPortal(
		<div className="flex flex-col-reverse absolute bottom-0 right-0 gap-3">
			{toasts.map(({ id, message }) => (
				<Toast key={id} message={message} />
			))}
		</div>,
		document.getElementById('toast-root')
	)
}
