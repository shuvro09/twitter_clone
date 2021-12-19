import React, { useEffect, useState } from 'react'
import './Feed.css'
import Post from './Post'
import TweetBox from './TweetBox'
import db from './firebase.js'
import {  onSnapshot, collection, query } from "firebase/firestore";
function Feed({curr_user}) {
    const [posts,setPosts] = useState([]);
    console.log(db)
    useEffect(()=>{
        const q=query(collection(db, "posts"));
        onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc=>({...doc.data(),key:doc.id})))
          });
    },[])
    return (
        <div className='feed'>
            {/* Header */}
            <div className='feed__header'>
                <h2>Home</h2>
            </div>
            
            {/* Tweet Box */}
            <TweetBox curr_user={curr_user}></TweetBox>
            {/* Posts */}
            {posts.map(post=>(
                <Post 
                curr_user={curr_user}
                key={post.key}
                id={post.key}
                userName={post.userName}
                displayName={post.displayName}
                verified={post.verified}
                text={post.text}
                image={post.image}
                avatar={post.avatar}
                like={post.likes.length}
                isLiked={post.likes.includes(curr_user.uid)}
            />
            ))}
            
        </div>
    )
}

export default Feed
