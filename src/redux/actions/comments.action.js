import request from "../../api";
import { COMMENT_LIST_FAIL, COMMENT_LIST_REQ, COMMENT_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../action-types";

export const getCommentsOfVideoById = (id)=>async (dispatch)=>{
     
    try {
        
        dispatch({
            type: COMMENT_LIST_REQ,
        })

        const response = await request("/commentThreads",{

            params:{
                part: "snippet",
                videoId:id
            }
        }) 
        
        
        dispatch({
            type: COMMENT_LIST_SUCCESS,
            payload: response.data.items
        })
        

    } catch (error) {

        dispatch({
            type: COMMENT_LIST_FAIL,
            payload: error.message
        })
    }
}

export const addComments = (id,text)=>async (dispatch,getState)=>{
     
    try {
        
        const obj = {
            snippet: {
               videoId:id,
               topLevelComment: {
                   snippet:{
                    textOriginal:text
                   }
               }
            }
        }


        await request.post("/commentThreads",obj,{

            params:{
                part: "snippet",
            },
            headers:{
                Authorization: `Bearer ${getState().auth.accessToken}`
            }
        }) 
        
        
        dispatch({
            type: CREATE_COMMENT_SUCCESS,
        })
        
        
        setTimeout(() => dispatch (getCommentsOfVideoById(id)), 3000);
       


    } catch (error) {
        
        console.log(error.message);
        dispatch({
            type: CREATE_COMMENT_FAIL,
            payload: error.message
        })
    }
}