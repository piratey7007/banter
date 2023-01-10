import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../utils/Auth'
import LoadingScreen from './LoadingScreen'

export default function PrivateRoute({ element }) {
	const { user, userIsLoaded } = useContext(AuthContext)
	if (userIsLoaded) {
		if (user) return element
		else return <Navigate to="/login" />
	} else return <LoadingScreen />
}
