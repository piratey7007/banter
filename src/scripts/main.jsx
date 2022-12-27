import '../index.css'
import React, { useReducer, useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import ReactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './utils/Auth'
import { ToastProvider } from './utils/Toast'
import { ToastRoot } from './components/Toast'

const Main = () => {
	return <App />
}

const Providers = ({ children }) => {
	return (
		<AuthProvider>
			<ToastProvider>
				<ToastRoot />
				{children}
			</ToastProvider>
		</AuthProvider>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Providers>
		<HashRouter>
			<Main />
		</HashRouter>
	</Providers>
)
