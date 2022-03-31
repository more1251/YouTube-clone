import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addComments, getCommentsOfVideoById } from '../redux/actions/comments.action';
import Comment from './Comment'


const CommentsComp = ({videoId,totalComments}) => {


    const dispatch = useDispatch();

    //Requesting Comments for a particular video Using the VideoID 
    useEffect(() => {
       dispatch(getCommentsOfVideoById(videoId))
    }, [dispatch,videoId])

    
    //Getting Required Data from Reducer
    const comments = useSelector(state => state.commentList.comments)

    const _comments = comments?.map(comment=>comment.snippet.topLevelComment.snippet);
    
    const {photoURL} = useSelector(state => state.auth?.user)
    
    const  [text,setText] = useState(''); 

    //Handle Comment function to post a comment on a video using dispatch and redux-action
    const handleComment = (e)=>{
        e.preventDefault();

        if (text.length===0) return

        dispatch(addComments(videoId,text))

        setText('')
        
    }
    

    return (
        <div className='comment'>
            <p>
                {parseInt(totalComments).toLocaleString('en-US')}&nbsp;
                Comments
            </p>

            <div className="comment-form d-flex w-100 my-2">
                <img src={photoURL} alt="user-img" className='rounded-circle me-3'/>
                
                <form onSubmit={handleComment} className="d-flex flex-grow-1"> 
                  <input type="text" className='flex-grow-1' placeholder='Add a comment...' value={text} onChange={(e)=> setText(e.target.value)}/>
                  
                  <button className="border-0 p-2">Comment</button>
                </form>

            </div>

            {/* Mapping the Top Comments On a Video */}
            <div className="comment-list">
               {_comments?.map((comment,i)=> (
                  <Comment comment={comment} key={i}/>
               ))}
            </div>
        </div>
    )
}

export default CommentsComp
