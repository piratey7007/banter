import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../utils/Auth'
import LoadingScreen from './LoadingScreen'

const PrivateRoute = (props) => {
	const { user, userIsLoaded } = useContext(AuthContext)

	return user ? props.element : !userIsLoaded ? <LoadingScreen /> : <Navigate to="/login" />
}

export default PrivateRoute
