import { useContext, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Chatroom from './pages/Chatroom'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { AuthContext } from './utils/Auth'
import PrivateRoute from './components/PrivateRoute'
import EmptyState from './components/EmptyState'
import MyProfile from './components/MyProfile'
import LoadingScreen from './components/LoadingScreen'
import Signup from './pages/Signup'
import Info from './components/Info'
import Header from './components/Header'
import ChatList from './components/ChatList'
import useChats from './utils/useChats'

export default function App() {
	const { user, userIsLoaded } = useContext(AuthContext)
	const [selectedChat, setSelectedChat] = useState(null)
	return (
		<div className='App flex flex-col justify-between h-screen'>
			{userIsLoaded ? (
				user ? (
					<>
						<Header className='' />
						<div className='bottom-bar flex justify-between flex-grow flex-shrink'>
							<ChatList className='w-1/3 max-xl:w-5/12 max-lg:hidden' />
							<Routes>
								<Route path='/' element={<EmptyState className='grow' />} />
								<Route path='profile/:id' element={<Profile className='grow' />} />
								<Route path='chatroom/:id' element={<Chatroom className='grow' />} />
								<Route path='*' element={<NotFound className='grow' />} />
							</Routes>
						</div>
					</>
				) : (
					<>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
							<Route path='*' element={<Navigate to='/login' />} />
						</Routes>
					</>
				)
			) : (
				<LoadingScreen />
			)}
		</div>
	)
}
