import React, {useState} from 'react'
import useAuthStore from '../store/authStore'

const AuthForm = () => {
    const [mode, setMode] = useState('signIn')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const {signIn, signOut, loading} = useAuthStore()
    const signIn = useAuthStore((state) => state.signIn)
    const signUp = useAuthStore((state) => state.signUp)
    const loading = useAuthStore((state) => state.loading)
    const error = useAuthStore((state) => state.error)

    const isSignIn = mode === 'signIn'

    const submitAuth = async (e) =>{
        e.preventDefault()

        if(email.trim() === '' || password.trim() === ''){
            alert("이메일과 비밀번호를 입력해 주세요")
            return
        }

        try{
            if(isSignIn){
                await signIn({email, password})
            }else{
                await signUp({email, password})
            }
        }catch(err){
            alert(err.message)
        }
    }


  return (
    <div>
      <h2>{isSignIn ? "로그인" : "회원가입"}</h2>
      <form onSubmit={submitAuth}>
        <input type="email" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "처리중..." : isSignIn ? "로그인" : "회원가입"}</button>
      </form>
      {error && <p>{error}</p>}

      <br /><br />
      <button onClick={()=>setMode(isSignIn ? "signUp" : "signIn")}>{isSignIn ? "회원가입하기" : "로그인하기" }</button>
    </div>
  )
}

export default AuthForm
