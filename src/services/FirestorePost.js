import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query, //조건 사용할 때    
    serverTimestamp, //내 서버와 컴퓨터 서버 시간을 맞추기 위해
    updateDoc
} from 'firebase/firestore'
import {db} from '../../firebase.js'

// 컬렉션 지정(게시판 내용을 그대로 폴더 서버에 넣기를 위함)
const postsRef=collection(db, 'posts')

// firestore가 가진 데이터를 react가 쓰기 쉬운 객체 형태로 변환
const mapDocumentToPost=(document)=>{
    const data=document.data()

    return{
        id: document.id,
        title: data.title || '',
        writer: data.writer || '',
        content: data.content || '',
        uid: data.uid || '',
        // at이 붙으면 앞이 뭐가 됐든지 간에 '실시간 현재 시간 날짜라는 뜻'
        createdAt:data.createdAt?.toDate?.().toISOString?.(),
        updateAt:data.updateAt?.toDate?.().toISOString?.()
        // ?,  || '': 만약 오류가 났을 때를 대비
    }
}

// 게시글 목록 최신순으로 가져오기
// 서버와 통신을 할 수 있게 해주는 거: async
export const fetchPostsFromFirestore=async()=>{
    const postsQuery=query(postsRef, orderBy('createdAt', 'desc'))
    const snapshot=await getDocs(postsQuery)

    return snapshot.docs.map(mapDocumentToPost)
}

// 새 게시글 추가
export const addPostToFirestore=async(newPost)=>{
    const document=await addDoc(postsRef,{
        title: newPost.title,
        writer: newPost.writer,
        content: newPost.content,
        uid: newPost.uid,
        createdAt:serverTimestamp(),
        updateAt:serverTimestamp()
    })
    return{
        id: document.id,
        ...newPost,
        createdAt:new Date().toISOString(),
        updateAt: new Date().toISOString()
    }
}

export const deletePostFromFirestore = async (id)=>{
    await deleteDoc(doc(db, 'posts', id))
}

// 선택한 게시글 수정
export const updatePostInFirestore = async (post) => {
    const postsRef = doc(db , 'posts', post.id)

    await updateDoc(postsRef, {
        title : post.title,
        writer : post.writer,
        content : post.content,
        updateAt : serverTimestamp(),
    })

    return {
        ...post,
        updateAt : new Date()
    }
}
