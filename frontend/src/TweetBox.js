import { Avatar, Button } from '@mui/material'
import React, {  useState } from 'react'
import './TweetBox.css'
import db from './firebase.js'
import {   collection, addDoc  } from "firebase/firestore";
function TweetBox({curr_user}) {
    const [tweetMessage,setTweetMessage] = useState('');
    const [tweetImage,setTweetImage] = useState('');
    const sendTweet = async (e)=>{
        e.preventDefault();
        console.log(curr_user)
        if(!(tweetImage||tweetMessage))
        return
        try{
            await addDoc(collection(db, "posts"), {
                avatar:"",
                userName: curr_user.email.split('@')[0],
                displayName: curr_user.displayName,
                image:tweetImage,
                text:tweetMessage,
                verified:true,
                likes:[]
              });
            setTweetMessage("");
            setTweetImage("");
        }
        catch(e)
        {console.log(e)}
    }
    const handleChange = (e) =>{
        let file = e.target.files;
        let reader = new FileReader();
        try{
        reader.readAsDataURL(file[0]);
        }
        catch(e)
        {
            console.log(e)
            alert('invalid object selected')
        }
        reader.onload=(e)=>{setTweetImage(e.target.result)
        console.log(tweetImage)}
    }
    return (
        <div className='tweetBox'>
            <form>
                <div className='tweetBox__input'>
                    <Avatar></Avatar>
                    <input 
                    onChange={e=>setTweetMessage(e.target.value)}
                    value={tweetMessage}
                    placeholder="What's happening" 
                    type='text'></input>
                </div>
                <input type='file' name='file' onChange={e=>handleChange(e)} accept="image/png, image/gif, image/jpeg"></input>
                {/* <input className='tweetBox__imageInput'
                onChange={e=>setTweetImage(e.target.value)}
                value={tweetImage} 
                placeholder="Enter Image URL" 
                type='text'></input> */}
                <Button 
                onClick={sendTweet}
                type ='submit'
                className='tweetBox__tweetButton'>Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox
