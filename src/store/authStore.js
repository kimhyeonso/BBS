import { create } from "zustand";
import {
    signOutWithFirebase,
    signUpWithEmail,
    signInWithEmail,
    subscribeAuthState
} from '../services/firebaseAuth'

const mapUser = (user) => {
    if(!user){
        return null
    }

    return {
        uid : user.uid,
        email : user.email
    }
}

const useAuthStore = create((set) => ({
    user : null, 
    initialized : false,
    loading : false,
    error : '',

    // 로그인 실시간 상태 감지
    listenAuthState : () => {
        return subscribeAuthState((user) => {
            set({
                user : mapUser(user), 
                initialized : true,
            })
        })
    },

    // 회원가입
    signUp : async ({email, password}) =>{
        set({loading : true, error:''})
        try{
            const user = await signUpWithEmail({email, password})
            set({ user : mapUser(user), loading:false})
        }catch(err){
            set({error : err.message, loading:false})
            throw err 
        }
    },

    // 로그인
    signIn : async ({ email, password }) => {
        set({ loading: true, error: '' })
        try {
            const user = await signInWithEmail({ email, password })
            set({user: mapUser(user),loading: false})
        } catch (err) {
            set({ error: err.message, loading: false})
            throw err
        }
    },

    // 로그아웃
    signOut : async () => {
        await signOutWithFirebase()
        set({ user : null , error : ''})
    }
}))

export default useAuthStore
