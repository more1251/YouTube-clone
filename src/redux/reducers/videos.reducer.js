import { CHANNEL_DETAILS_FAIL, CHANNEL_VIDEO_REQ, CHANNEL_VIDEO_SUCCESS, GET_LIKED_VIDEOS_FAIL, GET_LIKED_VIDEOS_REQ, GET_LIKED_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQ, HOME_VIDEOS_SUCC, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQ, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQ, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQ, SELECTED_VIDEO_SUCCESS } from "../action-types"

const initialState = {
      
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: 'All'
}

export const homeVideosReducer = (vidState = initialState,action)=>{
       
    const {type, payload} = action

    switch(type){

        case HOME_VIDEOS_SUCC:
            return {
                ...vidState, 
                videos: 
                   vidState.activeCategory === payload.category ? [...vidState.videos, ...payload.videos] 
                   : payload.videos, 
                   
                loading: false, 
                nextPageToken: payload.nextPageToken,
                activeCategory: payload.category
            }
        
        case HOME_VIDEOS_FAIL:
            return {...vidState, loading: false, error: payload}

        case HOME_VIDEOS_REQ:
            return {...vidState, loading: true}

        
        default:
            return vidState
    }
}


export const SelectedVideoReducer = (
    
    vidState = {
        loading: true,
        video:null
    },action )=>{
     
    const {payload,type} = action

    switch (type) {
        case SELECTED_VIDEO_REQ:
             
            return{
                ...vidState,
                loading: true
            }

        case SELECTED_VIDEO_SUCCESS:
             
            return{
                ...vidState,
                video: payload,
                loading: false
            }

        case SELECTED_VIDEO_FAIL:
             
            return{
                ...vidState,
                video: null,
                loading: false,
                error:payload
            }
    
        default:
            return vidState
    }

}

export const RelatedVideoReducer = (
    
    vidState = {
        loading: true,
        videos:[]
    },action )=>{
     
    const {payload,type} = action

    switch (type) {
        case RELATED_VIDEO_REQ:
             
            return{
                ...vidState,
                loading: true
            }

        case RELATED_VIDEO_SUCCESS:
             
            return{
                ...vidState,
                videos: payload,
                loading: false
            }

        case RELATED_VIDEO_FAIL:
             
            return{
                ...vidState,
                loading: false,
                error:payload
            }
    
        default:
            return vidState
    }

}

export const SearchedVideoReducer = (
    
    vidState = {
        loading: true,
        videos:[]
    },action )=>{
     
    const {payload,type} = action

    switch (type) {
        case SEARCH_VIDEO_REQ:
             
            return{
                ...vidState,
                loading: true
            }

        case SEARCH_VIDEO_SUCCESS:
             
            return{
                ...vidState,
                videos: payload,
                loading: false
            }

        case SEARCH_VIDEO_FAIL:
             
            return{
                ...vidState,
                loading: false,
                error:payload
            }
    
        default:
            return vidState
    }

}

export const ChannelPageVideoReducer = (
    
    vidState = {
        loading: true,
        videos:[]
    },action )=>{
     
    const {payload,type} = action

    switch (type) {
        case CHANNEL_VIDEO_REQ:
             
            return{
                ...vidState,
                loading: true
            }

        case CHANNEL_VIDEO_SUCCESS:
             
            return{
                ...vidState,
                videos: payload,
                loading: false
            }

        case CHANNEL_DETAILS_FAIL:
             
            return{
                ...vidState,
                loading: false,
                error:payload
            }
    
        default:
            return vidState
    }

}

export const LikedVideoReducer = (
    
    vidState = {
        loading: true,
        videos:[]
    },action )=>{
     
    const {payload,type} = action

    switch (type) {
        case GET_LIKED_VIDEOS_REQ:
             
            return{
                ...vidState,
                loading: true
            }

        case GET_LIKED_VIDEOS_SUCCESS:
             
            return{
                ...vidState,
                videos: payload,
                loading: false
            }

        case GET_LIKED_VIDEOS_FAIL:
             
            return{
                ...vidState,
                loading: false,
                error:payload
            }
    
        default:
            return vidState
    }

}