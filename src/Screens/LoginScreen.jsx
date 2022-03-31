import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/auth.action'
import { useNavigate } from 'react-router-dom';
import HelmetCustom from '../components/HelmetCustom';

const LoginScreen = () => {
     
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const LoginTitle = "YouTube-Login"
    const accessToken = useSelector(state=>state.auth.accessToken);

    const handleLogin = ()=>{
       dispatch(login());
    }
     
    useEffect(() => {
        
        if(accessToken){
           navigate("/");
        }

    }, [accessToken,navigate])


    return (
        <div className='login'>
            <HelmetCustom title={LoginTitle}/>
            <div className="login-container">
                <img src='https://www.freepnglogos.com/uploads/youtube-logo-icon-png-11.png' alt=''/>
                <button onClick={handleLogin}>Login</button>
                <p>Youtube Clone using Youtube API</p>
            </div>
        </div>
    )
}

export default LoginScreen
