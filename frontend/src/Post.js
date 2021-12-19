import { Avatar } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import React from 'react'
import './Post.css'
import { doc, updateDoc,arrayUnion,arrayRemove } from "firebase/firestore";
import db from './firebase'
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
    const handleLikes = async ()=>{
        console.log('in')
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
        console.log('out')
    };
    
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
                        </h3>
                    </div>
                    <div className='post__headerDescription'>
                        <p>{text}</p>
                    </div>
                </div>
                {image && <img src={image} alt='post_image'></img>}
                <div className='post__footer'>
                    <ChatBubbleOutlineOutlinedIcon fontSize='small' />
                    <RepeatOutlinedIcon fontSize='small' />
                    <div>
                        {!isLiked?
                            <FavoriteBorderIcon fontSize='small' onClick={handleLikes} />:
                            <FavoriteIcon fontSize='small' onClick={handleLikes} className='isLiked'/>
                            }
                        {like===0  ?null: <span>{like}</span>}
                    </div>
                    <IosShareOutlinedIcon fontSize='small'/>
                </div>
            </div>
        </div>
    )
}
export default Post
