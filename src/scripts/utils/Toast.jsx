import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const ToastContext = React.createContext()

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([])

	const value = {
		toasts,
		addToast(message) {
			const toast = { id: uuidv4(), message }
			setToasts((toasts) => [...toasts, toast])
		},
	}

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
