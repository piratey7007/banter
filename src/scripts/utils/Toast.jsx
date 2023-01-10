import { createContext, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { v4 as uuidv4 } from 'uuid'

export const ToastContext = createContext()

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([])

	function addToast(message) {
		const toast = { id: uuidv4(), message }
		setToasts((toasts) => [...toasts, toast])
	}
	function removeToast(id) {
		setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
	}

	const value = { toasts, addToast, removeToast }

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

function Toast({ id, message }) {
	const { removeToast } = useContext(ToastContext)
	useEffect(() => {
		const timer = setTimeout(() => {
			removeToast(id)
		}, 3000)
		return () => clearTimeout(timer)
	}, [])
	return (
		<div className="toast">
			<p>{message}</p>
		</div>
	)
}

export function ToastRoot() {
	const { toasts } = useContext(ToastContext)

	useEffect(() => {
		console.log(toasts)
	}, [toasts])

	return ReactDOM.createPortal(
		<>
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
		</>,
		document.getElementById('toast-root')
	)
}
