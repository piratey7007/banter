import React, { useEffect, useState, createContext } from 'react'
import { deleteDoc, collection, setDoc, doc, getDoc, addDoc, query, where, getDocs } from '@firebase/firestore'
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
import { auth, db } from './firebaseInfo'
import { useNavigate } from 'react-router-dom'

const users = collection(db, 'users')

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [authUser, setAuthUser] = useState(null)
	const [details, setDetails] = useState(null)
	const [userIsLoaded, setUserIsLoaded] = useState(false)
	const setUserNull = () => {
		setUser(null)
		setAuthUser(null)
		setDetails(null)
		setUserIsLoaded(true)
	}

	const [status, setStatus] = useState(null)
	const setError = (error) => setStatus({ error })
	const setSuccess = (success) => setStatus({ success })
	const setPending = (pending) => setStatus({ pending })

	const navigate = useNavigate()

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				// IIFE to get and set user details
				;(async () => {
					setAuthUser(currentUser)
					const docRef = doc(users, currentUser.uid)
					const docSnap = await getDoc(docRef)
					try {
						if (docSnap.exists()) setDetails(docSnap.data())
						else {
							setDetails(
								setDoc(doc(users, currentUser.uid), {
									email: currentUser.email,
									uid: currentUser.uid,
								}),
							)
						}
					} catch (error) {
						setUserNull()
						setStatus({ error })
						if (!pathname.includes('login') && !pathname.includes('signup')) navigate('/login')
					}
				})()
			} else {
				setUserNull()
				const { pathname } = location
				if (!pathname.includes('login') && !pathname.includes('signup')) navigate('/login')
			}
		})
	}, [])

	useEffect(() => {
		if (details && authUser) {
			setUser({
				...authUser,
				...details,
			})
			setUserIsLoaded(true)
			if (location.pathname === '/login' || location.pathname === '/signup') navigate('/')
		}
	}, [details, authUser])

	let functions = {
		async signUp(email, password) {
			try {
				setPending('Creating an account for you...')
				const { user } = await createUserWithEmailAndPassword(auth, email, password)
				await addDoc(users, {
					email: user.email,
					uid: user.uid,
				})
				setSuccess('Account created successfully!')
				setAuthUser(user)
			} catch (err) {
				setError('There was a problem creating an account. Make sure the information is valid and try again.')
			}
		},
		async signIn(email, password) {
			try {
				setPending('Signing in...')
				await signInWithEmailAndPassword(auth, email, password)
				setSuccess('Signed in successfully!')
				setUser(user)
			} catch (err) {
				try {
					const q = query(users, where('email', '==', email))
					const querySnapshot = await getDocs(q)
					if (querySnapshot.size > 0) {
						setError(
							'Uh oh! It looks like you have an account with us, but it is not linked to this email. Please sign in with your Google account, then link it to this email in the user settings.',
						)
					}
				} catch (err) {
					alert(err)
					setError('There was a problem signing in. Check your email and password and try again.')
				}
			}
		},
		async signOut() {
			try {
				setPending('Signing out...')
				await signOut(auth)
				setSuccess('Signed out successfully!')
				setUser(null)
			} catch {
				setError('There was a problem signing out.')
			}
		},
		async resetPassword(email) {
			try {
				setPending('Sending password reset email...')
				await sendPasswordResetEmail(auth, email)
				setSuccess('Password reset email sent!')
			} catch (err) {
				setError('Uh oh! There was a problem sending the password reset email. Try again later.')
			}
		},
		async updatePassword(password) {
			try {
				setPending('Updating password...')
				await updatePassword(auth.currentUser, password)
				setSuccess('Password updated successfully!')
			} catch (err) {
				setError('Uh oh! There was a problem updating your password. Try again later.')
			}
		},
		async updateEmail(email) {
			try {
				setPending('Updating email...')
				await updateEmail(auth.currentUser, email)
				setSuccess('Email updated successfully!')
			} catch (err) {
				setError('Uh oh! There was a problem updating your email. Try again later.')
			}
		},
		async sendEmailVerification() {
			await sendEmailVerification(auth.currentUser)
		},
		async googleSignUp(email, password) {
			try {
				setPending('Signing up with Google...')
				const { user } = await signInWithPopup(
					auth,
					new GoogleAuthProvider(),
					email && password ? { email, password } : undefined,
				)
				const docRef = doc(db, 'users', user.uid)
				const userDoc = await getDoc(docRef)
				if (userDoc.exists()) throw new Error('Account already exists. Try signing in instead.')
				setSuccess('Signed up with Google successfully!')
				setUser(user)
			} catch (err) {
				setError(err.message || 'There was a problem signing up with Google. Try again later.')
				await signOut()
			}
		},
		async googleSignIn(email, password) {
			try {
				setPending('Signing in with Google...')
				const { user } = await signInWithPopup(
					auth,
					new GoogleAuthProvider(),
					email && password ? { email, password } : undefined,
				)
				const docRef = doc(db, 'users', user.uid)
				const userDoc = await getDoc(docRef)
				setUser(user)
				setSuccess('Signed in with Google successfully!')
				if (!userDoc.exists()) throw new Error('Create an account first!')
			} catch (err) {
				const q = query(users, where('email', '==', email))
				const querySnapshot = await getDocs(q)
				if (querySnapshot.size > 0) {
					setError(
						'Uh oh! It looks like you have an account with us, but it is not linked to your Google account. Please sign in with your email and password, then link your Google account in your profile settings.',
					)
				}
				setError(err.message || 'There was a problem signing in with Google. Try another method.')
			}
		},
		async removeUser() {
			try {
				await deleteUser(auth.currentUser)
				await deleteDoc(users, auth.currentUser.uid)
			} catch (err) {
				setError(err.message || 'There was a problem deleting your account. Try again later.')
			}
		},
		async updateUserDetails(data) {
			try {
				const userDoc = doc(db, 'users', auth.currentUser.uid)
				const userDetails = await getDoc(userDoc)

				const updates = []
				for (const [key, value] of Object.entries(data))
					if (userDetails.data()[key] !== value) updates.push({ key, value })
				setDoc(userDoc, {
					...userDetails.data(),
					...updates.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}),
				})
			} catch (err) {
				setError(err.message || 'There was a problem updating your details. Try again later.')
			}
		},
	}

	return (
		<AuthContext.Provider value={{ ...functions, user, auth, userIsLoaded, status, setError, setSuccess, setPending }}>
			{children}
		</AuthContext.Provider>
	)
}
