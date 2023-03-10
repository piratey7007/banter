import { collection, getDocs, query, where } from '@firebase/firestore'
import { SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Form from '../components/Form'
import GoogleButton from '../components/GoogleButton'
import StatusAlert from '../components/StatusAlert'
import { AuthContext, Status } from '../utils/Auth'
import { db } from '../utils/firebaseInfo'

const Signup: React.FC = () => {
  const { status: authStatus, signIn } = useContext(AuthContext)
  const { googleSignIn } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    setStatus(authStatus)
  }, [authStatus])
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status | null>({})

  async function handleLogin(e: React.MouseEvent | undefined) {
    e?.preventDefault()
    const email = emailRef.current?.value,
      password = passwordRef.current?.value
    if (!email) return setStatus({ error: 'Please enter an email' })
    if (!password) return setStatus({ error: 'Please enter a password' })
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('email', '==', email)),
    )
    if (querySnapshot.size < 1) return setStatus({ error: 'Email not found' })
    await signIn(email, password)
  }

  async function handleGoogle() {
    await googleSignIn()
    navigate('/')
  }

  return (
    <Card>
      <h1>Login</h1>
      <>{false && <StatusAlert status={status} />}</>
      <Form onSubmit={handleLogin} action='login'>
        <input type='text' ref={emailRef} placeholder='Email/Username' />
        <input type='password' ref={passwordRef} placeholder='Password' />
      </Form>
      <Link to='/signup'>Need an account?</Link>
      <button onClick={handleLogin} type='submit'>
        Login
      </button>
      <GoogleButton onClick={handleGoogle}>Login with Google</GoogleButton>
    </Card>
  )
}

export default Signup
