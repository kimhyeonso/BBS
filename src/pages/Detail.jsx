import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import usePostStore from '../store/postStore'
import styles from './Detail.module.scss'

const Detail = () => {
  const { id } = useParams()
  const posts = usePostStore((state) => state.posts)
  const updatePost = usePostStore((state) => state.updatePost)
  const post = posts.find((item) => {
    return item.id === id
  })

  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState(post ? post.title : '')
  const [writer, setWriter] = useState(post ? post.writer : '')
  const [content, setContent] = useState(post ? post.content : '')

  const updatefunc = () => {
    if (title.trim() === '' || writer.trim() === '' || content.trim() === '') {
      alert('모든 내용을 입력하세요')
      return
    }

    updatePost({
      id: post.id,
      title: title,
      writer: writer,
      content: content
    })

    setIsEdit(false)
  }

  if (!post) {
    return (
      <div>
        <h2>게시글이 없습니다</h2>
        <Link to={'/'}>목록으로</Link>
      </div>
    )
  }

  return (
    <div className={styles.detailBox}>
      <h2  className={styles.detailTitle}>게시글 상세보기</h2>

      {
        isEdit ? (
          <>
           <div className={styles.detailInfo}>
              <p><strong>번호 : </strong>{post.id}</p>
              <input  className={styles.input}
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              <input  className={styles.input}
                type="text"
                value={writer}
                onChange={(e) => { 
                  setWriter(e.target.value)
                }}
              />
              <textarea className={styles.textarea}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                }}
              />
            </div>

            <div className={styles.buttonBox}>

              <button onClick={updatefunc}>저장</button>
              <button onClick={() => {
                setTitle(post.title)
                setWriter(post.writer)
                setContent(post.content)
                setIsEdit(false)
              }}>취소</button>
            </div>
          </>
        ) : (
          <>
          <div className={styles.detailInfo}>
            <p>
              <strong>번호</strong> : {post.id}
            </p>
            <p>
              <strong>제목</strong> : {post.title}
            </p>
            <p>
              <strong>작성자</strong> : {post.writer}
            </p>
          </div>
          <div className={styles.contentBox}>
            <p>
              <h4>내용</h4>
            </p>
            <div>{post.content}</div>
          </div>

          <div className={styles.buttonBox}>
            <button onClick={() => { setIsEdit(true) }}>수정</button>
            <Link to='/'>목록으로</Link>
          </div>
          </>
        )
      }
    </div>
  )
}

export default Detail
