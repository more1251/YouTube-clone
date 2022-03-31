import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQ, CHANNEL_DETAILS_SUCCESS, GET_SUBSCRIPTION_STATUS, SUBSCRIPTION_CHANNEL_FAIL, SUBSCRIPTION_CHANNEL_REQ, SUBSCRIPTION_CHANNEL_SUCCESS } from "../action-types"


export const ChannelDetailReducer = (
    
    channelState = {
        loading: true,
        channel:{},
        subsStatus : false
    },action )=>{
     
    const {payload,type} = action

    switch (type) {
        case CHANNEL_DETAILS_REQ:
             
            return{
                ...channelState,
                loading: true
            }

        case CHANNEL_DETAILS_SUCCESS:
             
            return{
                ...channelState,
                channel: payload,
                loading: false
            }

        case CHANNEL_DETAILS_FAIL:
             
            return{
                ...channelState,
                channel: null,
                loading: false,
                error:payload
            }

        case GET_SUBSCRIPTION_STATUS:
             
            return{
                    ...channelState,
                    subsStatus: payload
            }
        
    
        default:
            return channelState
    }

}


export const SubscriptionChannelReducer = (
    
    channelState = {
        loading: true,
        channel:[],
        subsStatus : false
    },action )=>{
     
    const {payload,type} = action

    switch (type) {
        case SUBSCRIPTION_CHANNEL_REQ:
             
            return{
                ...channelState,
                loading: true
            }

        case SUBSCRIPTION_CHANNEL_SUCCESS:
             
            return{
                ...channelState,
                channel: payload,
                loading: false
            }

        case SUBSCRIPTION_CHANNEL_FAIL:
             
            return{
                ...channelState,
                channel: null,
                loading: false,
                error:payload
            }

    
        default:
            return channelState
    }

}
