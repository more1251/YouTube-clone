import request from "../../api"
import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQ, CHANNEL_DETAILS_SUCCESS, GET_SUBSCRIPTION_STATUS, SUBSCRIPTION_CHANNEL_FAIL, SUBSCRIPTION_CHANNEL_REQ, SUBSCRIPTION_CHANNEL_SUCCESS, } from "../action-types"

export const getChannelDetailsId = (id)=>async dispatch=>{
     
    try {
        
        dispatch({
            type: CHANNEL_DETAILS_REQ,
        }) 
        
        const response = await request("/channels",{

            params:{
                part: "snippet,statistics,contentDetails",
                id
            }
        }) 
        
        
        dispatch({
            type: CHANNEL_DETAILS_SUCCESS,
            payload: {
                video: response.data.items[0],
            }
        })


    } catch (error) {
        dispatch({
            type: CHANNEL_DETAILS_FAIL,
            payload: error.message
        })
    }
}


export const getSubscriptionStatus = (id)=>async (dispatch,getState)=>{
     
    try {
        
        const response = await request("/subscriptions",{

            params:{
                part: "snippet",
                forChannelId: id,
                mine: true
            },
            headers:{
                Authorization: `Bearer ${getState().auth.accessToken}`
            }
        }) 
        
        
        dispatch({
            type: GET_SUBSCRIPTION_STATUS,
            payload: response.data.items.length!==0
            
        })

    } catch (error) {
       console.log(error.message);
    }
}

export const getSubscriptionChannels = (id)=>async (dispatch,getState)=>{
     
    try {

        dispatch({
            type: SUBSCRIPTION_CHANNEL_REQ
        })
        
        const response = await request("/subscriptions",{

            params:{
                part: "snippet,contentDetails",
                maxResults: 50,
                mine: true
            },
            headers:{
                Authorization: `Bearer ${getState().auth.accessToken}`
            }
        }) 
        
        
        dispatch({
            type: SUBSCRIPTION_CHANNEL_SUCCESS,
            payload: response.data.items
            
        })

    } catch (error) {

        dispatch({
            type: SUBSCRIPTION_CHANNEL_FAIL,
            payload: error.message
            
        })
    }
}

