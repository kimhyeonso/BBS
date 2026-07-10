import React from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import styles from './Board.module.scss'
import img from '../assets/image01.png'

const Board = () => {
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
      <PostForm />
      <PostList />
    </main>
  )
}

export default Board
