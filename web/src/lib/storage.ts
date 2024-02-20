// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD9U5f0NeXVsuS9Zbsr8ArqmjvqiUrY2U4',
  authDomain: 'stora-6dd6f.firebaseapp.com',
  projectId: 'stora-6dd6f',
  storageBucket: 'stora-6dd6f.appspot.com',
  messagingSenderId: '242970389443',
  appId: '1:242970389443:web:61ff20b22d5e672fef6b76',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
