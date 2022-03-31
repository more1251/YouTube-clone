import request from "../../api"
import {CHANNEL_VIDEO_FAIL, CHANNEL_VIDEO_REQ, CHANNEL_VIDEO_SUCCESS, GET_LIKED_VIDEOS_FAIL, GET_LIKED_VIDEOS_REQ, GET_LIKED_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQ, HOME_VIDEOS_SUCC, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQ, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQ, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQ, SELECTED_VIDEO_SUCCESS } from "../action-types"

export const getPopularVideos = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: HOME_VIDEOS_REQ,
        })

        const response = await request("/videos", {
            params: {
                part: "snippet,contentDetails,statistics",
                chart: "mostPopular",
                regionCode: "IN",
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
            }
        })


        dispatch({
            type: HOME_VIDEOS_SUCC,
            payload: {
                videos: response.data.items,
                nextPageToken: response.data.nextPageToken,
                category: 'All'
            }
        })
    } catch (error) {

        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        })
    }
}


export const getVideobyCatg = (keyword) => async (dispatch, getState) => {

    try {

        dispatch({
            type: HOME_VIDEOS_REQ,
        })

        const response = await request("/search", {
            params: {
                part: "snippet",
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
                q: keyword,
                type: 'video'
            }
        })

        dispatch({
            type: HOME_VIDEOS_SUCC,
            payload: {
                videos: response.data.items,
                nextPageToken: response.data.nextPageToken,
                category: keyword
            }
        })
    } catch (error) {

        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        })
    }
}


export const getVideoById = (id) => async dispatch => {

    try {

        dispatch({
            type: SELECTED_VIDEO_REQ,
        })

        const response = await request("/videos", {

            params: {
                part: "snippet,statistics",
                id: id
            }
        })


        dispatch({
            type: SELECTED_VIDEO_SUCCESS,
            payload: response.data.items[0],
        })


    } catch (error) {
        dispatch({
            type: SELECTED_VIDEO_FAIL,
            payload: error.message
        })
    }
}


export const getRelatedVideos = (id) => async dispatch => {

    try {

        dispatch({
            type: RELATED_VIDEO_REQ,
        })

        const response = await request("/search", {

            params: {
                part: "snippet",
                relatedToVideoId: id,
                maxResults: 15,
                type: 'video'
            }
        })


        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload: response.data.items
        })


    } catch (error) {
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload: error.message
        })
    }
}


export const getVideobySearch = (keyword) => async (dispatch) => {

    try {

        dispatch({
            type: SEARCH_VIDEO_REQ,
        })

        const response = await request("/search", {
            params: {
                part: "snippet",
                maxResults: 20,
                q: keyword,
                type: 'video,channel'
            }
        })

        dispatch({
            type: SEARCH_VIDEO_SUCCESS,
            payload: response.data.items
        })
    } catch (error) {

        dispatch({
            type: SEARCH_VIDEO_FAIL,
            payload: error.message
        })
    }
}


export const getVideobyChannel = (id) => async (dispatch) => {

    try {

        dispatch({
            type: CHANNEL_VIDEO_REQ,
        })
        

        //GET UPLOAD PLAYLIST ID
        const response = await request("/channels",{

            params:{
                part: "contentDetails",
                id:id
            }
        }) 
        
        const uploadPlaylistId = response.data.items[0].contentDetails.relatedPlaylists.uploads 

        //GET VIDEOS FROM ID
        const response2 = await request("/playlistItems",{

            params:{
                part: "contentDetails,snippet",
                playlistId:uploadPlaylistId,
                maxResults:50,
            }
        }) 


        dispatch({
            type: CHANNEL_VIDEO_SUCCESS,
            payload: response2.data.items
        })

    } catch (error) {

        dispatch({
            type: CHANNEL_VIDEO_FAIL,
            payload: error.message
        })
    }
}

export const getLikedVideosofUser = () => async (dispatch,getState) => {

    try {

        dispatch({
            type: GET_LIKED_VIDEOS_REQ,
        })
        

        const response = await request("/videos",{

            params:{
                part: "snippet,contentDetails,statistics",
                myRating: "like",
                maxResults: 100
            },
            headers:{
                Authorization: `Bearer ${getState().auth.accessToken}`
            }
        }) 
        


        dispatch({
            type: GET_LIKED_VIDEOS_SUCCESS,
            payload: response.data.items
        })

    } catch (error) {

        dispatch({
            type: GET_LIKED_VIDEOS_FAIL,
            payload: error.message
        })
    }
}
