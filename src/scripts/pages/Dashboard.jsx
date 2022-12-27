import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../utils/Auth'
import { collection, getDocs, doc, query, where, limit } from 'firebase/firestore'
import { db } from '../utils/firebase'
import Header from '../components/Dashboard/Header'
import ChatList from '../components/Dashboard/ChatList'
import NewChat from '../components/Dashboard/NewChat'

const Dashboard = () => {
	const { signOut, getUserDetails, user } = useContext(AuthContext)
	const [chats, setChats] = useState()
	const [userInfo, setUserInfo] = React.useState()
	const [loading, setLoading] = useState({ chats: true, userInfo: true })

	async function updateChats() {
		setLoading({ ...loading, chats: true })
		const q = query(
			collection(db, 'conversations'),
			where('users', 'array-contains', { displayName: user.displayName, id: user.uid }),
			limit(25)
		)
		const querySnapshot = await getDocs(q)
		const conversations = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
		setChats(conversations)
		setLoading({ ...loading, chats: false })
	}

	useEffect(() => {
		// IIFE to get and set user details
		;(async () => {
			setLoading((loading) => ({ chats: loading.chats, userInfo: true }))
			const details = await getUserDetails()
			setUserInfo({
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				...details,
			})
			setLoading((loading) => ({ chats: loading.chats, userInfo: false }))
		})()

		// IIFE to get and set user chats
		;(async () => {
			setLoading((loading) => ({ userInfo: loading.userInfo, chats: true }))
			const userRef = doc(db, 'users', user.uid)
			const q = query(
				collection(db, 'conversations'),
				where('users', 'array-contains', { displayName: user.displayName, id: user.uid }),
				limit(25)
			)
			const querySnapshot = await getDocs(q)
			const conversations = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
			setChats(conversations)
			setLoading((loading) => ({ userInfo: loading.userInfo, chats: false }))
		})()
	}, [])

	return (
		<div className="w-full h-full flex flex-col items-center">
			{!loading.userInfo && <Header userInfo={userInfo} />}
			{loading.userInfo && <Header />}
			{!loading.chats && <ChatList chats={chats} user={user} updateChats={updateChats} />}
			{loading.chats && <ChatList />}
			<NewChat updateChats={updateChats} />
		</div>
	)
}

export default Dashboard
