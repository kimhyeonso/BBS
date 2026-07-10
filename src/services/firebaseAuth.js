import {
    browserCookiePersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
} from 'firebase/auth'

import {auth} from '../../firebase.js'

const getAuthMessage = (code) => {
    const message = {
    'auth/email-already-in-use': '이미 가입된 이메일입니다.',
    'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
    'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
    'auth/weak-password': '비밀번호는 6자 이상으로 입력해 주세요.',
    'auth/user-disabled': '비활성화된 계정입니다.',
}

    return message[code] || '인증 요청에 실패했습니다'
}

const handleAuthError = (error) => {
    throw new Error(getAuthMessage(error.code))
}

// 웹브라우저가 가지고 있는 로그인 정보를 firebase에게 맡기는 작업이다.
setPersistence(auth, browserCookiePersistence)

// 로그인, 로그아웃, 새로고침 후 로그인 복원상태를 감지
export const subscribeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback)
}

// 이메일, 비밀번호로 회원가입
export const signUpWithEmail = async ({email, password})=> {
    try{
        const credential = await createUserWithEmailAndPassword(auth , email, password)
        return credential.user
    }catch(err){
        handleAuthError(err)
    }
}

// 이메일 / 비밀번호 로그인
export const signInWithEmail = async ({email, password}) => {
    try{
        const credential = await signInWithEmailAndPassword(auth, email, password)
        return credential.user
    }catch(err){
        handleAuthError(err)
    }
}

// 로그아웃
export const signOutWithFirebase = () => {
    return firebaseSignOut(auth)
}
