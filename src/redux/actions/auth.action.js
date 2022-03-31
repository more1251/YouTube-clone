import firebase from 'firebase/compat/app';
import auth from '../../firebase';

import { LOAD_PROF, LOGIN_FAIL, LOGIN_REQ, LOGIN_SUC, LOGOUT } from '../action-types';


export const login = () => async dispatch =>{

    try {
        
        dispatch({
            type: LOGIN_REQ,
        })

        const provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')

        const res = await auth.signInWithPopup(provider);
    
        const accessToken = res.credential.accessToken;

        const profile = {
            name: res.additionalUserInfo.profile.name,
            photoURL: res.additionalUserInfo.profile.picture
        }
        
        sessionStorage.setItem("ytcl-access-token",accessToken)
        sessionStorage.setItem("ytcl-user", JSON.stringify(profile))

        dispatch({
            type: LOGIN_SUC,
            payload: accessToken
        })

        dispatch({
            type: LOAD_PROF,
            payload: profile
        })

    }catch(error){
      dispatch({
        type: LOGIN_FAIL,
        payload: error.message
      })

    }
}


export const logout = () => async dispatch =>{

    await auth.signOut()

    dispatch({
        type: LOGOUT
    })

    sessionStorage.removeItem("ytcl-access-token");
    sessionStorage.removeItem("ytcl-user");
}
