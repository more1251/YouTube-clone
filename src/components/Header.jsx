import React from 'react';
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({handleToggle}) => {

    const [input, setInput] = useState('');
    
    const navigate = useNavigate();
   

    //Function to Navigate us to search page if user searches for a specific video 
    const handleSubmit = (e)=>{
        
        e.preventDefault();
        navigate(`/search/${input}`);
    }
    
    //Will take us to home page
    const handleRedirecttoHome = ()=>{
        navigate("/");
    }

    
    const user = useSelector(state => state.auth?.user)

    return (
        <div className='header cursor'>
            
            <div className="header-brand">
               <FaBars className='header_menu' size={26} onClick={()=> handleToggle()}/>
                
                <div className='d-flex ms-4' onClick={handleRedirecttoHome}>
                    <img className='header_logo no-select' src="https://www.freepnglogos.com/uploads/youtube-logo-icon-png-11.png" alt="youtube-logo" />

                    <h2 className='brand-name no-select'>YouTube</h2>
                </div>
            </div>


            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Search' value={input} onChange={e=>setInput(e.target.value)} />
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header-icons">
                <MdNotifications size={28} />
                <MdApps size={28} />
                <img src={user?.photoURL} alt="user-img" />
            </div>
        </div>
    )
}

export default Header
