import { Avatar } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react'
import './Post.css'
import { doc, updateDoc,arrayUnion,arrayRemove, deleteDoc, addDoc, collection, onSnapshot, query } from "firebase/firestore";
import db from './firebase'
import Comment from './Comment';
function Post({
    curr_user,
    displayName,
    userName,
    verified,
    text,
    avatar,
    image,
    id,
    like,
    isLiked
}) {
    const [commentText,setCommentText] = useState('');
    const [comment,setComment] = useState([])
    const [disable,setDisable] = useState(false);
    const [showComment,setShowComment] = useState(false);
    useEffect(()=>{
        const q=query(collection(db, "posts",id,"comments"));
        onSnapshot(q, (snapshot) => {
            setComment(snapshot.docs.map(doc=>({...doc.data(),key:doc.id})).sort((a,b)=>a.timestamp-b.timestamp))
          });
    },[id])
    const handleLikes = async ()=>{
        try{
            if(isLiked)
            {
                await updateDoc(doc(db, "posts",id), {
                    likes:arrayRemove(curr_user.uid)
                  });
            }
            else{
                await updateDoc(doc(db, "posts",id), {
                    likes:arrayUnion(curr_user.uid)
                  });
            }
        }
        catch(e)
        {console.log(e)}
    };
    const handleDelete = async ()=>{
        try{
            await deleteDoc(doc(db, "posts",id))
        }
        catch(e)
        {    console.log(e);}
    }
    const postComment = async ()=>{
        setDisable(true);
        if(commentText==='' || commentText===null)
        {setDisable(false);return;}
        
        try{
            await addDoc(collection(db, "posts",id,"comments"), {
                avatar:"",
                userName: curr_user.email.split('@')[0],
                displayName: curr_user.displayName,
                text:commentText,
                verified:true,
                likes:[],
                timestamp:new Date().getTime()
              });
              setCommentText("");
              setDisable(false);
        }
        catch(e)
        {
            console.log(e);
        }
    }
    return (
        <div className='post'>
            <div className='post__avatar'>
                <Avatar src={avatar}/>
            </div>
            <div className='post__body'>
                <div className='post__header'>
                    <div className='post__headerText'>
                        <h3>{displayName} 
                            <span className='post__headerSpecial'>
                                {verified && <VerifiedIcon className='post__badge'/>}  
                                @{userName}
                            </span>
                            
                            {((curr_user.displayName===displayName && curr_user.email.split('@')[0]===userName) || curr_user.email===process.env.REACT_APP_ADMIN) && <DeleteOutlineIcon className='post__delete' onClick={handleDelete}/>}
                        </h3>
                    </div>
                    <div className='post__headerDescription'>
                        <p>{text}</p>
                    </div>
                </div>
                {image && <img src={image} alt='post_image'></img>}
                <div className='post__footer'>
                    <div>
                        <ChatBubbleOutlineOutlinedIcon className='chatIcon' fontSize='small' onClick={()=>setShowComment(!showComment)}/>
                        {!comment || comment.length===0?null:<span>{comment.length}</span>}
                    </div>
                    <RepeatOutlinedIcon fontSize='small' />
                    <div>
                        {!isLiked?
                            <FavoriteBorderIcon fontSize='small' className='favouriteIcon' onClick={handleLikes} />:
                            <FavoriteIcon fontSize='small' onClick={handleLikes} className='isLiked'/>
                            }
                        {like===0  ?null: <span>{like}</span>}
                    </div>
                    <IosShareOutlinedIcon fontSize='small'/>
                </div>
                <div className='post__comments' style={{display:showComment?'flex':'none'}}>
                    <div className='comment__body'>
                         {comment.length!==0 && 
                         comment.map((comment,index)=>
                            <Comment 
                                key={comment.key}
                                curr_user={curr_user}
                                displayName={comment.displayName}
                                userName={comment.userName}   
                                verified={comment.verified}    
                                text={comment.text}
                                avatar={comment.avatar}   
                                id= {comment.key} 
                                post_id={id}
                            />
                         )     
                         }
                    </div>
                    <div className='post__commentFooter'>
                    <textarea  
                        type='text' 
                        placeholder='Write a comment..' 
                        className='post__commentBox'
                        onChange={(e)=>{setCommentText(e.target.value)}}
                        value={commentText}
                    >
                    </textarea >
                    <button onClick={postComment} disabled={disable} className='comment__button'><SendIcon/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post
