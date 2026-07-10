import React, { useState } from 'react'
import usePostStore from '../store/postStore'
import styles from './PostForm.module.scss'
import useAuthStore from '../store/authStore'

const PostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const user = useAuthStore((state)=>state.user)

  const addPost = usePostStore((state) => state.addPost)
  const loading = usePostStore((state) => state.loading)

  const submitB = async () => {
    if(!user){
      alert("로그인 후 사용해주세요")
      return
    }

    if(title.trim() === '' || content.trim() === ''){
      alert("제목과 내용을 입력해주세요")
      return
    }

    try{
      const newPost = {
        title : title,
        writer : user.email,
        content : content,
        uid : user.uid
      }

      await addPost(newPost)

      setTitle('')
      setContent('')
    }catch(error){
      alert(error.message)
    }
  }

  return (
    <div className={styles.writerBox}>
      <h3>글쓰기</h3>

      <div className={styles.wcontent}>
        <div className={styles.titleBox}>
          <div className={styles.title}>
            <label htmlFor="ti">제목</label>
            <input
              id="ti"
              type="text"
              placeholder="제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.writer}>
            <label htmlFor="wr">작성자</label>
            <input
              id="wr"
              type="text"
              value={user?.email || ''} readOnly
            />
          </div>
        </div>
        <div className={styles.txtBox}>
          <div className={styles.txt}>
            <label htmlFor="tx">내용</label>
            <textarea
              id="tx"
              placeholder="글 내용 입력"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button onClick={submitB} disabled={loading}>{loading ? '등록중' : '등록'}</button>
    </div>
  )
}

export default PostForm
