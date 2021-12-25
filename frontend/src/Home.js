import './App.css';
import Feed from './Feed';
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import { Navigate  } from 'react-router-dom';

function Home({user}) {
  if(!user || user.uid===null) 
    return <Navigate  to='/'/>
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
