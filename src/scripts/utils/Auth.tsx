import React, { useEffect, useState, createContext } from 'react'
import { deleteDoc, collection, setDoc, doc, getDoc, addDoc, query, where, getDocs } from '@firebase/firestore'
import firebase, {
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

export interface User extends firebase.User {
	uid: string
	bio?: string
	birthday?: string
	defaultColors?: string[] | string | undefined
	chats?: string[]
	age?: number
}

export interface UserDetails {}

export interface UserInfo {
	displayName?: string
	email?: string
	photoURL?: string
	defaultColors?: string[] | string
	birthday?: string
	age?: number
	bio?: string
}

interface IAuthContext {
	user: User | null
	userIsLoaded: boolean
	status: Status | null
	signUp: (email: string, password: string) => Promise<void>
	signIn: (email: string, password: string) => Promise<void>
	signOut: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	updatePassword: (password: string) => Promise<void>
	updateEmail: (email: string) => Promise<void>
	sendEmailVerification: () => Promise<void>
	googleSignUp: (email?: string, password?: string) => Promise<void>
	googleSignIn: (email?: string, password?: string) => Promise<void>
	removeUser: () => Promise<void>
	updateUserDetails: (data: UserInfo) => Promise<void>
}

export type Status = {
	error?: string
	success?: string
	pending?: string
}

export const AuthContext = createContext({} as IAuthContext)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [authUser, setAuthUser] = useState<firebase.User | null>(null)
	const [details, setDetails] = useState<UserDetails | null>(null)
	const [userIsLoaded, setUserIsLoaded] = useState(false)
	const setUserNull = () => {
		setUser(null)
		setAuthUser(null)
		setDetails(null)
		setUserIsLoaded(true)
	}

	const [status, setStatus] = useState<Status | null>(null)
	const setError = (error: string) => setStatus({ error })
	const setSuccess = (success: string) => setStatus({ success })
	const setPending = (pending: string) => setStatus({ pending })

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
					} catch (error: any) {
						const { pathname } = location
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
		async signUp(email: string, password: string) {
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
		async signIn(email: string, password: string) {
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
		async resetPassword(email: string) {
			try {
				setPending('Sending password reset email...')
				await sendPasswordResetEmail(auth, email)
				setSuccess('Password reset email sent!')
			} catch (err) {
				setError('Uh oh! There was a problem sending the password reset email. Try again later.')
			}
		},
		async updatePassword(password: string) {
			try {
				setPending('Updating password...')
				if (auth.currentUser) await updatePassword(auth.currentUser, password)
				else throw new Error('No user signed in')
				setSuccess('Password updated successfully!')
			} catch (err) {
				setError('Uh oh! There was a problem updating your password. Try again later.')
			}
		},
		async updateEmail(email: string) {
			try {
				setPending('Updating email...')
				if (auth.currentUser) await updateEmail(auth.currentUser, email)
				else throw new Error('No user signed in')
				setSuccess('Email updated successfully!')
			} catch (err) {
				setError('Uh oh! There was a problem updating your email. Try again later.')
			}
		},
		async sendEmailVerification() {
			try {
				if (auth.currentUser) await sendEmailVerification(auth.currentUser)
				else throw new Error('No user signed in')
			} catch (err) {
				setError('Uh oh! There was a problem sending the verification email. Try again later.')
			}
		},
		async googleSignUp(email?: string, password?: string) {
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
			} catch (err: any) {
				setError(err || 'There was a problem signing up with Google. Try again later.')
				await signOut(auth)
			}
		},
		async googleSignIn(email?: string, password?: string) {
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
			} catch (err: any) {
				const q = query(users, where('email', '==', email))
				const querySnapshot = await getDocs(q)
				if (querySnapshot.size > 0) {
					setError(
						'Uh oh! It looks like you have an account with us, but it is not linked to your Google account. Please sign in with your email and password, then link your Google account in your profile settings.',
					)
				}
				setError(err || 'There was a problem signing in with Google. Try another method.')
			}
		},
		async removeUser() {
			try {
				if (!auth.currentUser) throw new Error('No user signed in')
				await deleteUser(auth.currentUser)
				await deleteDoc(doc(users, auth.currentUser.uid))
			} catch (err: any) {
				setError(err || 'There was a problem deleting your account. Try again later.')
			}
		},
		async updateUserDetails(data: UserInfo) {
			try {
				if (!auth.currentUser) throw new Error('No user signed in')
				const userDoc = doc(db, 'users', auth.currentUser.uid)
				const userDetails = await getDoc(userDoc)

				const updates = []
				for (const [key, value] of Object.entries(data))
					if (userDetails.exists() && userDetails.data()[key] !== value) updates.push({ key, value })
				setDoc(userDoc, {
					...userDetails.data(),
					...updates.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}),
				})
			} catch (err: any) {
				setError(err || 'There was a problem updating your details. Try again later.')
			}
		},
	}

	const value = {
		...functions,
		user,
		userIsLoaded,
		status,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
