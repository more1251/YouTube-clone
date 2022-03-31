import { LOAD_PROF, LOGIN_FAIL, LOGIN_REQ, LOGIN_SUC, LOGOUT } from "../action-types"

const initialState = {
    accessToken: sessionStorage.getItem("ytcl-access-token")? sessionStorage.getItem("ytcl-access-token") : null,
    user: sessionStorage.getItem("ytcl-user")? JSON.parse(sessionStorage.getItem("ytcl-user")) : null,
    loading: false
}


export const authReducer = (state = initialState, action)=>{
      
    const {type,payload} = action

    switch(type){

        case LOGIN_REQ:
            return {...state,loading:true}
        
        case LOGIN_SUC:
            return {...state, accessToken:payload, loading:false}

        case LOGIN_FAIL:
            return {...state, accessToken:null, loading: false, error: payload}

        case LOAD_PROF:
            return {...state, user: payload}

        case LOGOUT:
            return {...state, accessToken: null, user: null}

        default:
            return state
    }
}