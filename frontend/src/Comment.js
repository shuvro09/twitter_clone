import { Avatar } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from 'react'
import './Comment.css'
import { deleteDoc, doc } from 'firebase/firestore';
import db from './firebase'
function Comment({userName,displayName,avatar,verified,text,curr_user,id,post_id}) {
    const handleDelete = async ()=>{
        try{
            await deleteDoc(doc(db, "posts",post_id,"comments",id))
        }
        catch(e)
        {  console.log(e);}
    }
    return (
        <div className='comment'>
            <div className='comment__avatar'>
                <Avatar src={avatar}/>
            </div>
            <div className='comment__header'>
                    <div className='comment__headerText'>
                        <h3>{displayName} 
                            <span className='comment__headerSpecial'>
                                {verified && <VerifiedIcon className='comment__badge'/>}  
                                @{userName}
                            </span>
                            {((curr_user.displayName===displayName && curr_user.email.split('@')[0]===userName)|| curr_user.email===process.env.REACT_APP_ADMIN) && <DeleteOutlineIcon className='comment__delete' onClick={handleDelete}/>}
                        </h3>
                    </div>
                    <div className='comment__headerDescription'>
                        <p>{text}</p>
                    </div>
                </div>
        </div>
    )
}

export default Comment
