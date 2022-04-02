import React,{useEffect} from 'react'
import numeral from 'numeral'
import {MdThumbUp, MdThumbDown} from 'react-icons/md'
import { AiFillBell } from "react-icons/ai";
import ShowMoreText from 'react-show-more-text'
import { useDispatch,useSelector} from 'react-redux'
import { getChannelDetailsId, getSubscriptionStatus } from '../redux/actions/channel.actions'
import HelmetCustom from './HelmetCustom';

const VideoMetaData = ({video :{snippet,statistics}, videoId}) => {

    const {channelId, channelTitle, description,title,publishedAt} = snippet;

    const {viewCount, likeCount} = statistics;
    
    const dispatch = useDispatch()

    //Requesting the ChannelDetails and Subscription status of Logined user at every render
    useEffect(() => {
        dispatch(getChannelDetailsId(channelId));
        dispatch(getSubscriptionStatus(channelId));
    }, [dispatch,channelId])
    

    const {channel} = useSelector(state=>state.channelDetail);

    const subsStatus = useSelector(state=>state.channelDetail.subsStatus);

    //Getting the Date Month and year from  "publishedAt" to Display it as Youtube 
    const date = new Date(publishedAt);  // 2022-01-01
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    return (
        <div className='video-MetaData py-2'>

            <HelmetCustom title={title} description={description}/>
            <div className="video-MetaData-top">
                <h5>{title}</h5>

                <div className="d-flex justify-content-between align-items-center py-1">
                    <span className='viewandlike'>
                        {numeral(viewCount).format("0.a").toUpperCase()} Views • &nbsp;   

                        {month.length>3?month.slice(0,3):month}&nbsp;{day},&nbsp;{year}
                    </span>

                    <div className='cursor'>
                        <span className='me-3 thumbsup'>
                            <MdThumbUp size={26}/>&nbsp;&nbsp;{numeral(likeCount).format("0.a").toUpperCase()} 
                        </span>
                        <span className='me-3'>
                            <MdThumbDown size={26}/>&nbsp;DISLIKE
                        </span>
                    </div>
                
                    
                </div>
            </div>

            <div className="video-MetaData-channel d-flex justify-content-between align-items-center my-2 py-3">

                <div className="d-flex channel-data">
                    <img src={channel?.video?.snippet?.thumbnails?.default?.url} alt="user-channel" className='rounded-circle me-3'/>

                    <div className='d-flex flex-column'>
                        <span>{channelTitle}</span>
                        <span>{numeral(channel?.video?.statistics?.subscriberCount).format("0.a").toUpperCase()} subscribers</span>
                    </div>
                </div>
                
                {subsStatus? 
                <div>
                <button className="btn border-0 p-2 m-2" style={{backgroundColor: "rgba(255, 255, 255, 0.1)", color:"#aaa"}}>Subscribed</button>
                <AiFillBell size={25} className="bell"/> 
                </div>
                :
                <button className="btn border-0 p-2 m-2">Subscribe</button>
                } 

            </div>

            <div className="video-MetaData-description">
               <ShowMoreText
                 line={3}
                 more="SHOW MORE"
                 less="SHOW LESS"
                 anchorClass='showMoreText'
                 expanded={false}
               >
              {description}
               </ShowMoreText>
            </div>
           
        </div>
    )
}

export default VideoMetaData
