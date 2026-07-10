import React from 'react'
import { Link } from 'react-router-dom'
import usePostStore from '../store/postStore'
import styles from './PostList.module.scss'
import useAuthStore from '../store/authStore'

const PostList = () => {
  const posts = usePostStore((state)=> state.posts)
  const deletePost = usePostStore((state)=> state.deletePost)
  const loading = usePostStore((state)=> state.loading)
  const error = usePostStore((state)=> state.error)
  const user = useAuthStore((state)=> state.user)

  return (
    <section>
      <div className={styles.title}>
        <h3>게시글 목록</h3>
        {error && <p>{error}</p>}
        {loading && <p>불러오는 중입니다</p>}
      </div>
      
      {
        posts.length === 0 && !loading ? (<h3>등록된 게시글이 없습니다</h3>) : (
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>삭제 / 수정</th>
              </tr>
            </thead>
            <tbody>
              {
                posts.map((item, index) => {
                  const isOwner = user?.uid === item.uid
                  return (
                    <tr key={item.id}>
                      <td>{posts.length - index}</td>
                      <td><Link to={`/detail/${item.id}`}>{item.title}</Link></td>
                      <td>{item.writer}</td>
                      <td>
                        {isOwner ? (<>
                        <Link to={`/detail/${item.id}`}>수정</Link>
                        <button onClick={() => { deletePost(item.id) }}>삭제</button>
                        </>):(<span>읽기</span>)
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }
    </section>
  )
}

export default PostList
