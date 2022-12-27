import '../index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
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
	<BrowserRouter basename="banter">
		<Providers>
			<Main />
		</Providers>
	</BrowserRouter>
)
