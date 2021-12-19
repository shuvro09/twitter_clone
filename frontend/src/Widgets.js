import React from 'react'
import './Widgets.css';
import SearchIcon from '@mui/icons-material/Search';
import {   TwitterTweetEmbed } from 'react-twitter-embed';
function Widgets() {
    return (
        <div  className='widgets'>
            <div className='widgets__input'>
                <SearchIcon className='widgets__searchIcon'></SearchIcon>
                <input type='text' placeholder='Search'></input>
            </div>
            <div className='widgets__widgetContainer'>
                <h2>What's Happening</h2>
                <TwitterTweetEmbed  tweetId={'933354946111705097'}/>
            </div>
        </div>
    )
}

export default Widgets;
