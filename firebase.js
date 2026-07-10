// firebase.js :: 프로젝트 폴더에 있어야 합니다

// Firebase 설정 파일입니다.
// Firebase Console > 프로젝트 설정 > 일반 > 내 앱에서 값을 확인한 뒤 .env에 넣습니다.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase 환경변수를 확인해 주세요.')
}

// Firebase 명령어: initializeApp()
// React 프로젝트와 Firebase 프로젝트를 연결합니다.
const app = initializeApp(firebaseConfig)

// Firebase 명령어: getAuth()
// Firebase Authentication 기능을 사용할 수 있게 합니다.
export const auth = getAuth(app)

// Firebase 명령어: getFirestore()
// Firestore Database 기능을 사용할 수 있게 합니다.
export const db = getFirestore(app)
