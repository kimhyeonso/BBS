import React from 'react'
import AuthForm from '../components/AuthForm'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import useAuthStore from '../store/authStore'
import styles from './Board.module.scss'
import img from '../assets/image01.png'

const Board = () => {
  const user = useAuthStore((state) => state.user)
  const initialized = useAuthStore((state) => state.initialized)
  const signOut = useAuthStore((state) => state.signOut)

  return (
    <main>
      <h2>🌸React CRUD 기능 게시판🌸</h2>
      <img src={img} alt="이미지" 
        className={styles.topBtn}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
      }}
      />
      <div className={styles.authBox}>
        {user ? (
          <>
            <p>{user.email}님 방문해주셔서 감사합니다</p>
            <button onClick={signOut}>로그아웃</button>
          </>
        ) : initialized ? (
          <AuthForm/>
        ) : (
          <p>로그인 상태 확인중</p>
        )}
      </div>
      <PostForm />
      <PostList />
    </main>
  )
}

export default Board
