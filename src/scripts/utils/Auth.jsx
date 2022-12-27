import React, { useEffect, useState, createContext } from 'react'
import { deleteDoc, collection, setDoc, doc, getDoc, addDoc, query, where, getDocs } from 'firebase/firestore'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	updatePassword,
	updateEmail,
	sendEmailVerification,
	signInWithPopup,
	GoogleAuthProvider,
	deleteUser,
} from 'firebase/auth'
import { auth, db } from './firebase'
import { useNavigate } from 'react-router-dom'

const users = collection(db, 'users')

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(1)
	const [error, setError] = useState(null)
	let first = true

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setLoading((prev) => prev + 1)
			if (currentUser) {
				setUser(currentUser)
				if (location.pathname === '/login' || location.pathname === '/signup') navigate('/')
			} else {
				setUser(null)
				if (location.pathname !== '/login' && location.pathname !== '/signup') navigate('/login')
			}
			setLoading((prev) => prev - 1)
			if (first) {
				first = false
				setLoading((prev) => prev - 1)
			}
		})
	}, [])

	let functions = {
		async signUp(email, password) {
			setLoading((prev) => prev + 1)
			const { user } = await createUserWithEmailAndPassword(auth, email, password)
			await addDoc(users, {
				email: user.email,
				uid: user.uid,
			})
			setUser(user)
			setLoading((prev) => prev - 1)
		},
		async signIn(email, password) {
			setLoading((prev) => prev + 1)
			try {
				await signInWithEmailAndPassword(auth, email, password)
				setUser(user)
			} catch (err) {
				const docRef = await getDocs(query(users, where('email', '==', email)))[0]
				setError('Error signing in')
				if (docRef) {
					console.log(docRef)
					setError()
					setLoading((prev) => prev + 1)
					try {
						googleSignIn(email, password)
						setUser(user)
					} catch {
						setError('Error linking existing account')
					} finally {
						setLoading((prev) => prev - 1)
					}
				}
			} finally {
				setLoading((prev) => prev - 1)
			}
		},
		async signOut() {
			setError()
			setLoading((prev) => prev + 1)
			try {
				await signOut(auth)
				setUser(null)
			} catch {
				setError('Error signing out')
			} finally {
				setLoading((prev) => prev - 1)
			}
		},
		async resetPassword(email) {
			setLoading((prev) => prev + 1)
			await sendPasswordResetEmail(auth, email)
			setLoading((prev) => prev - 1)
		},
		async updatePassword(password) {
			setLoading((prev) => prev + 1)
			await updatePassword(auth.currentUser, password)
			setLoading((prev) => prev - 1)
		},
		async updateEmail(email) {
			setLoading((prev) => prev + 1)
			await updateEmail(auth.currentUser, email)
			setLoading((prev) => prev - 1)
		},
		async sendEmailVerification() {
			setLoading((prev) => prev + 1)
			await sendEmailVerification(auth.currentUser)
			setLoading((prev) => prev - 1)
		},
		async googleSignIn(email, password) {
			setLoading((prev) => prev + 1)
			try {
				const { user } = await signInWithPopup(
					auth,
					new GoogleAuthProvider(),
					email && password ? { email, password } : undefined
				)
				const docRef = doc(db, 'users', user.uid)
				const userDoc = await getDoc(docRef)
				if (!userDoc.exists()) {
					await setDoc(docRef, {
						email: user.email,
						displayName: user.displayName,
					})
				}
				setUser(user)
			} catch (err) {
				await signOut()
				console.log(err)
				setError('Google Sign-in Failed')
			} finally {
				setLoading((prev) => prev - 1)
			}
		},
		async removeUser() {
			setLoading((prev) => prev + 1)
			await deleteUser(auth.currentUser)
			await deleteDoc(users, auth.currentUser.uid)
			setLoading((prev) => prev - 1)
		},
		async getUserDetails() {
			console.log()
			setLoading((prev) => prev + 1)
			try {
				const docRef = doc(db, 'users', auth.currentUser.uid)
				const userDoc = await getDoc(docRef)
				if (!userDoc.exists()) throw new Error('User does not exist')
				return userDoc.data()
			} catch (error) {
				setError('Error getting user details')
				console.log(error)
			} finally {
				setLoading((prev) => prev - 1)
			}
		},
		async updateUserDetails(data) {
			console.log()
			const userDoc = doc(db, 'users', auth.currentUser.uid)
			const userDetails = await getDoc(userDoc)

			//iterate through keys in data object and update the user details
			const updates = []
			for (const [key, value] of Object.entries(data))
				if (userDetails.data()[key] !== value) updates.push({ key, value })
			setDoc(userDoc, {
				...userDetails.data(),
				...updates.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}),
			})
		},
	}

	return (
		<AuthContext.Provider value={{ ...functions, user, auth, loading, setLoading, error, setError }}>
			{children}
		</AuthContext.Provider>
	)
}
