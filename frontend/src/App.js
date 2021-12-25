import './App.css';
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
import Signup from './Signup'
function App() {
  const [user,setUser] = useState({});
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
    console.log(currentUser)
  })
  
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Signup/>}></Route>
        <Route exact path='/feed'  element={<Home user={user} />}></Route>
    </Routes>
    </BrowserRouter>
    
  );
}
export default App;
