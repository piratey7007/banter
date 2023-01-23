import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from '@firebase/auth'
import { getStorage } from '@firebase/storage'

const app = initializeApp({
  apiKey: 'AIzaSyCxWrrAUwQ5i2NSPq3PweddKTcpZT7PU5Y',
  authDomain: 'banter-5ea15.firebaseapp.com',
  projectId: 'banter-5ea15',
  storageBucket: 'banter-5ea15.appspot.com',
  messagingSenderId: '1080105380533',
  appId: '1:1080105380533:web:5d3290e81ccac75b93ecfc',
  measurementId: 'G-WE3B3FHHFB',
})

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }
