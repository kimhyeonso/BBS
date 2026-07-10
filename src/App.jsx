import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useAuthStore from './store/authStore'
import usePostStore from './store/postStore'

import Board from './pages/Board'
import Detail from './pages/Detail'
import AuthForm from './components/AuthForm'

const App = () => {
  // const [posts, setPosts] = useState([
  //   { id: 2, title: '두번째 글', writer: '관리자', content: '두번째 글입니다' },
  //   { id: 1, title: 'CRUD 게시 첫번째 글', writer: '관리자', content: '상세보기, 수정, 삭제 기능이 있습니다' }
  // ])

  // const addPost = (newPost) => {
  //   const nextId = posts.length === 0 ? 1 : Math.max(...posts.map((item) => item.id)) + 1

  //   setPosts([{ ...newPost, id: nextId }, ...posts])
  // }

  // const deletePost = (id) => {
  //   const newPost = posts.filter((item) => {
  //     return item.id !== id
  //   })

  //   setPosts(newPost)
  // }

  // const updatePost = (updatePost) => {
  //   const newPosts = posts.map((item) => {
  //     if (item.id === updatePost.id) {
  //       return updatePost
  //     }
  //     return item
  //   })

  //   setPosts(newPosts)
  // }

  const user = useAuthStore((state) => state.user)
  const initialized = useAuthStore((state) => state.initialized)
  const listenAuthState = useAuthStore((state) => state.listenAuthState)
  const signOut = useAuthStore((state) => state.signOut)
  const fetchPosts = usePostStore((state) => state.fetchPosts)

  useEffect(()=>{
    const unsubscribe = listenAuthState()

    //firebase 실시간 감지를 정리
    return () => unsubscribe()
  }, [listenAuthState])

  useEffect(()=>{
    fetchPosts()
  }, [fetchPosts])
  return (
    <div>
      <header>
      {user ? (
        <>
          <p>{user.email}</p>
          <button onClick={signOut}>로그아웃</button>
        </>
        ) : initialized ? (
          <AuthForm/>
        ) : (<p>"로그인 상태 확인중"</p>)}
      </header>
      <Routes>
        <Route path='/' element={<Board />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
