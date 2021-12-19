import { Button } from '@mui/material'
import React, { useState } from 'react'
import './Signup.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import {auth} from "./firebase"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth"
import { useNavigate  } from 'react-router-dom';
function ModalSignup({show,setShow}){
    const [email,setEmail] = useState("");
    const [Name,setName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const register = async (e) => {
        e.preventDefault();
        setShow();
        try{
            const user= await createUserWithEmailAndPassword(auth,email,password);
            console.log(user,"in signup")
            await updateProfile(auth.currentUser,{
                displayName:Name
            });
            navigate('/feed')
        }
        catch(error){
            console.log(error);
            alert('Please provide valid details')
        }
    }
    return (
    <>
    {show && 
        <div className='modal__container'>
            <div className='modal'>
                <TwitterIcon className='twitter__icon'/>
                <button onClick={setShow} className='closeModal'>X</button>
                <h2>Create your account</h2>
                <div className='modal__input'>
                    <input 
                        type='text' 
                        placeholder='Name'
                        onChange={(event)=>setName(event.target.value)}
                    />
                </div>
                <div className='modal__input'>
                    <input 
                        type='text' 
                        placeholder='Email'
                        onChange={(event)=>setEmail(event.target.value)}
                    />
                </div>
                <div className='modal__input'>
                    <input 
                        type='password' 
                        placeholder='Password'
                        onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <Button fullWidth className='signup__button' onClick={(e)=>register(e)}>Submit</Button>
            </div>
        </div>
    }
    </>
    )
}
function ModalSignin({show,setShow}){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        setShow();
        try{
            const user = await signInWithEmailAndPassword(auth,email,password);
            console.log('logged',user)
            navigate('/feed')
            
        }
        catch(error){
            console.log(error);
        }
    }
    return (
    <>
    {show && 
        <div className='modal__container'>
            <div className='modal'>
                <TwitterIcon className='twitter__icon'/>
                <button onClick={setShow} className='closeModal'>X</button>
                <h2>Sign in to Twitter</h2>
                <div className='modal__input'>
                    <input 
                        type='text' 
                        placeholder='Email'
                        onChange={(event)=>setEmail(event.target.value)}
                    />
                </div>
                <div className='modal__input'>
                    <input 
                        type='password' 
                        placeholder='Password'
                        onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <Button fullWidth className='signup__button' onClick={(e)=>login(e)}>Submit</Button>
            </div>
        </div>
    }
    </>
    )
}
function Signup() {
    const [showSignupModal,setShowSignupModal] = useState(false);
    const [showSigninModal,setShowSigninModal] = useState(false);
    const toggleSignupModal = ()=>{
        setShowSignupModal(!showSignupModal);
    }
    const toggleSigninModal = ()=>{
        setShowSigninModal(!showSigninModal);
    }
    return (
        <div className='singup'>
            <div className='signup__image'>
                <TwitterIcon className='signup_twitterIcon'/>
                {/* <img src='https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png' alt='twitter signup image'/> */}
            </div>
            <div className='signup__part'>
                <TwitterIcon className='signup_part__twitterIcon'/>
                <h1>Happening Now</h1>
                <div className='singup__form'>
                    <h2>Join Twitter today.</h2>
                    <Button variant='outlined' fullWidth className='signup__button' onClick={toggleSignupModal}>Sign up</Button>
                    <small>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</small>
                    <h3>Already have an account?</h3>
                    <Button variant='outlined' fullWidth className='signup__button' onClick={toggleSigninModal}>Sign in</Button>
                </div>
                <ModalSignup show={showSignupModal} setShow={toggleSignupModal}/>
                <ModalSignin show={showSigninModal} setShow={toggleSigninModal}/>
            </div>
            
        </div>
    )
}

export default Signup
