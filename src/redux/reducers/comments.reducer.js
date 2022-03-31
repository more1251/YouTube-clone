import { COMMENT_LIST_FAIL, COMMENT_LIST_REQ, COMMENT_LIST_SUCCESS } from "../action-types"

export const CommentListReducer = (
    
    commentState = {
        loading: true,
        comments: null,
    },action )=>{
     
    const {payload,type} = action

    switch (type) {
        case COMMENT_LIST_REQ:
             
            return{
                ...commentState,
                loading: true
            }

        case COMMENT_LIST_SUCCESS:
             
            return{
                ...commentState,
                comments: payload,
                loading: false
            }

        case COMMENT_LIST_FAIL:
             
            return{
                ...commentState,
                loading: false,
                error:payload
            }
    
        default:
            return commentState
    }

}