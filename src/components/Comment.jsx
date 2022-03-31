import React from 'react'
import moment from 'moment'

const Comment = ({comment}) => {

  const {authorDisplayName,authorProfileImageUrl, publishedAt, textDisplay}
  = comment;
  
  return (

    <div className='comment p-2 d-flex'>
      <img src={authorProfileImageUrl} alt="user-comment" className='rounded-circle me-3'/>

      <div className="comment-body">
        <p className="comment-header mb-1">
          {authorDisplayName} • {moment(publishedAt).fromNow()==="a day ago"? "1 day ago" : moment(publishedAt).fromNow() } 
        </p>

        <p className='mb-0'>{textDisplay}</p>
      </div>
    </div>
  )
}

export default Comment