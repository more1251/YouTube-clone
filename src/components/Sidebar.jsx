import React from 'react';
import { MdSubscriptions,MdExitToApp,MdThumbUp,MdHistory,MdLibraryBooks,MdHome,MdOutlineSettings} from "react-icons/md";
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/auth.action';


const Sidebar = ({sidebar, handleToggle}) => {
  

  //This Function is to Close the Sidebar after clicking on a Sidebar list items only on screens below 520px
  const Matches = ()=> {

    const media = window.matchMedia("(max-width: 520px)");
    
    //If its true then only the HandleToggle Function will work
    if (media.matches) { 
      handleToggle(false);
    }
  }
  
  const dispatch = useDispatch()

  //To Logout of the app
  const handleLogOut = () =>{
    dispatch(logout());
  }
  
  

  return (
    <nav className={sidebar? "sidebar open": "sidebar"} onClick={()=> Matches()}>
      
      <Link to='/' className='sidebar-link-navigate'>
        <li>
          <MdHome size={23}/>
          <span className={sidebar? "span-collapse": "navigate-span"}>Home</span>
        </li>
      </Link>
      
      <Link to='/feed/subscriptions' className='sidebar-link-navigate'>
        <li>
          <MdSubscriptions size={23}/>
          <span className={sidebar? "span-collapse": "navigate-span"}>Subscriptions</span>
        </li>
      </Link>
      
      <Link to='/yourlikedvideos' className='sidebar-link-navigate'>
        <li>
          <MdThumbUp size={23}/>
          <span className={sidebar? "span-collapse": "navigate-span"}>Liked Videos</span>
        </li>
      </Link>

      <li>
        <MdHistory size={23}/>
        <span className={sidebar? "span-collapse": "navigate-span"}>History</span>
      </li>

      <li>
        <MdLibraryBooks size={23}/>
        <span className={sidebar? "span-collapse": "navigate-span"}>Library</span>
      </li>

      <li>
        <MdOutlineSettings size={23}/>
        <span className={sidebar? "span-collapse": "navigate-span"}>Settings</span>
      </li>

      <hr/>

      <li onClick={handleLogOut}>
        <MdExitToApp size={23}/>
        <span className={sidebar? "span-collapse": "navigate-span"}>Logout</span>
      </li>
      
      <hr/>

    </nav>
  )
}

export default Sidebar