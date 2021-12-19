import './App.css';
import Feed from './Feed';
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import { Navigate  } from 'react-router-dom';

function Home({user}) {
    console.log(user,"home")
  if(!user || user.uid===null) 
    return <Navigate  to='/login'/>
  return (
    <div className="app">            
        {/* Sidebar */}
        <Sidebar/>
        {/* Feed */}
        <Feed curr_user={user}/>
        {/*  */}
        {/* Widget */}
        <Widgets/>
    </div>
  );
}

export default Home;
