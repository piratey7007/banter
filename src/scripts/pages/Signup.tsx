import { addDoc, collection, getDocs, query, where } from '@firebase/firestore'
import { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Form from '../components/Form'
import GoogleButton from '../components/GoogleButton'
import StatusAlert from '../components/StatusAlert'
import { AuthContext, Status } from '../utils/Auth'
import { db } from '../utils/firebaseInfo'

export default function Signup() {
  const navigate = useNavigate()
  const { googleSignUp, signUp } = useContext(AuthContext)
  const emailRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState({} as Status)

  function verifyInformation() {
    const email = emailRef.current?.value,
      username = usernameRef.current?.value,
      password = passwordRef.current?.value,
      confirmPassword = confirmPasswordRef.current?.value

    setStatus({ pending: 'Verifying information...' })
    if (!email) return setStatus({ error: 'Please enter an email' })
    if (!username) return setStatus({ error: 'Please enter a username' })
    if (!password) return setStatus({ error: 'Please enter a password' })
    if (password !== confirmPassword)
      return setStatus({ error: 'Passwords do not match' })
    if (
      email.indexOf('@') === -1 ||
      email.indexOf('.') === -1 ||
      email.length < 5 ||
      email.indexOf('@') > email.indexOf('.')
    )
      return setStatus({ error: 'Please enter a valid email' })
    if (username.length < 3 || username.length > 20)
      return setStatus({
        error: 'Username must be between 3 and 20 characters',
      })
    if (password.length < 6 || password.length > 30)
      return setStatus({
        error: 'Password must be between 6 and 30 characters',
      })
    if (password.indexOf(' ') !== -1)
      return setStatus({ error: 'Password cannot contain spaces' })
    if (password.match(/[A-Z]/g) === null)
      return setStatus({
        error: 'Password must contain at least one uppercase letter',
      })
    if (password.match(/[a-z]/g) === null)
      return setStatus({
        error: 'Password must contain at least one lowercase letter',
      })
    if (password.match(/[0-9]/g) === null)
      return setStatus({ error: 'Password must contain at least one number' })
    if (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) === null)
      return setStatus({
        error: 'Password must contain at least one special character',
      })
    return setStatus({ pending: 'Creating account...' })
  }

  async function handleSignup(e: React.MouseEvent) {
    e?.preventDefault()
    verifyInformation()
    if (status?.error) return
    const user = {
      email: emailRef.current!.value,
      username: usernameRef.current!.value,
    }
    const { docs } = await getDocs(
      query(collection(db, 'users'), where('email', '==', user.email)),
    )
    if (docs.length > 0)
      return setStatus({ error: 'An account with this email already exists' })
    await signUp(user.email, passwordRef.current!.value)
    setStatus({ success: 'Account created successfully' })
  }

  async function handleGoogle() {
    await googleSignUp()
    const user = {}
    await addDoc(collection(db, 'users'), user)
    navigate('/')
  }

  return (
    <Card>
      <h1>Sign up</h1>
      <>
        {(status?.error || status?.success || status?.pending) && (
          <StatusAlert status={status} />
        )}
      </>
      <Form onSubmit={handleSignup} action='signup'>
        <input type='email' ref={emailRef} placeholder='Email' />
        <input type='text' ref={usernameRef} placeholder='Username' />
        <input type='password' ref={passwordRef} placeholder='Password' />
        <input
          type='password'
          ref={confirmPasswordRef}
          placeholder='Confirm Password'
        />
      </Form>
      <Link to='/login'>Already have an account?</Link>
      <button onClick={handleSignup} type='submit'>
        Sign up
      </button>
      <GoogleButton>Sign up with Google</GoogleButton>
    </Card>
  )
}
