import React, { useContext } from 'react'
import '../App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Chatroom from './pages/Chatroom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import MyProfile from './pages/MyProfile'
import { AuthContext } from './utils/Auth'
import PrivateRoute from './components/PrivateRoute'
function App() {
	const { loading, user } = useContext(AuthContext)
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<PrivateRoute element={<Dashboard />} />} />
				<Route path="/chat/:id" element={<PrivateRoute element={<Chatroom />} />} />
				<Route path="/login" element={loading ? <p>Loading...</p> : user ? <Navigate to="/" /> : <Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
