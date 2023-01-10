import '../index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './utils/Auth'
import { ToastProvider, ToastRoot } from './utils/Toast'

const Providers = ({ children }) => {
	return (
		<BrowserRouter basename='banter'>
			<AuthProvider>
				<ToastProvider>
					<ToastRoot />
					{children}
				</ToastProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Providers>
		<App />
	</Providers>,
)
