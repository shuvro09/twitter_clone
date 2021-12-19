import React from 'react'
import './Sidebar.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import SidebarOption from './SidebarOption';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';
import {auth} from "./firebase"
import {signOut} from "firebase/auth"
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
function Sidebar() {
    const logout = async ()=>{
        try{
            console.log('logging out')
            await signOut(auth);
        }
        catch (error){
            console.log(error);
        }
    }
    return (
        <div className='sidebar'>
            {/* Twitter Icone  */}
            <TwitterIcon  className='sidebar__twitterIcon'/>

            {/* Sidebar Options */}
            <SidebarOption active Icon={HomeIcon} text='Home'/>
            <SidebarOption Icon={SearchIcon} text='Explore'/>
            <SidebarOption Icon={NotificationsNoneIcon} text='Notifications'/>
            <SidebarOption Icon={MailOutlineIcon} text='Messages'/>
            <SidebarOption Icon={BookmarkBorderIcon} text='Bookmarks'/>
            <SidebarOption Icon={ListAltIcon} text='Lists'/>
            <SidebarOption Icon={PermIdentityIcon} text='Profile'/>
            <SidebarOption Icon={MoreHorizIcon} text='More'/>
            <SidebarOption Icon={SendIcon} text='' hidden/>
            <SidebarOption Icon={LogoutIcon} text='' hidden onclick={logout}/>
            {/* Tweet Button */}
            <Button variant='outlined' className='sidebar__tweet' >Tweet</Button>
            <Button variant='outlined' className='sidebar__tweet logout' onClick={logout}>Logout </Button>
        </div>
    )
}

export default Sidebar
