import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import request from '../api'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import moment from 'moment'
import numeral from 'numeral'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const VideoVertical = ({video, SearchScreen, subpsScreen,likedVideoScreen,WatchScreen }) => {


    const {
        id,
        snippet:
        {   channelId,
            channelTitle,
            description,
            title,
            publishedAt,
            thumbnails: { medium },
            resourceId
        } 
    } = video

    //This Variable checks whether the Served video is type of Video or channel
    const isVideo = !(id.kind === 'youtube#channel' || subpsScreen)

    const [views, setViews] = useState(null);

    const [duration, setDuration] = useState(null);

    const [channelIcon, setChannelIcon] = useState(null);

    const seconds = moment.duration(duration).asSeconds()

    const _duration = moment.utc(seconds * 1000).format("mm:ss")
    
    const _videoId = id?.videoId || id

    //Requesting the Details of the video like views,likeS ,title at every render
    useEffect(() => {

        const get_videoDetails = async () => {

            const res = await request("/videos", {

                params: {
                    part: 'contentDetails,statistics',
                    id: _videoId,

                }
            })
            setDuration(res.data.items[0].contentDetails.duration);
            setViews(res.data.items[0].statistics.viewCount);
        }

        if (isVideo)
            get_videoDetails();
    }, [_videoId, isVideo])

    //Requesting the Details of the video channel like channelIcon  at every render
    useEffect(() => {

        const get_channelIcons = async () => {

            const res = await request("/channels", {

                params: {
                    part: 'snippet',
                    id: channelId,

                }
            })
            setChannelIcon(res.data.items[0].snippet.thumbnails.default.url)
        }
        get_channelIcons();
    }, [channelId])

    const navigate = useNavigate();

    const _channelId = resourceId?.channelId || channelId

    //Navigates us to WatchScreen if the type is Video or Subscription channels page if it is a channel
    const handleClick = () => {

        isVideo ?
            navigate(`/watch/${_videoId}`)
            :
            navigate(`/channel/${_channelId}`)
    }

    const thumbnail = !isVideo && 'video-vertical-thumbnail-channel'
    
    const channelnametop = !isVideo  && 'video-vertical-title-title2'

    return (
        <Row className='video-vertical m-1 py-2 align-items-center' onClick={handleClick}>

            <Col xs={6} md={SearchScreen || subpsScreen || likedVideoScreen ? 4 : 6}>
                <div className="video-vertical-left">
                    <LazyLoadImage src={medium?.url} effect="blur"
                        className={`video-vertical-thumbnail ${thumbnail}`}
                        wrapperClassName='video-vertical-thumbnail-wrapper'
                    />

                    {/* Will Show Duration Only IF THE type is a video */}
                    {isVideo && (
                        <>
                            {_duration === "00:00" ?
                                <span className='video-vertical-duration' style={{ color: "red", border: "0.5px solid red", padding: "0.1rem" }}>LIVE NOW</span>
                                :
                                <span className='video-vertical-duration'>{_duration}</span>
                            }
                        </>
                    )}
                </div>
            </Col>

            <Col xs={6} md={SearchScreen || subpsScreen || likedVideoScreen ? 8 : 6}>
                <div className="video-vertical-right p-0">
                    

                    <p className={`video-vertical-title ${channelnametop} mb-2`}>
                        {title}
                    </p>
                    
                    {/* Will Show Views and Date published at Only IF THE type is a SearchScreen ,WatchScreen */}
                    {((isVideo && SearchScreen) || WatchScreen) &&
                        <div className="video-vertical-details">
                            <span>
                                <AiFillEye /> {numeral(views).format("0.a").toUpperCase()} views • &nbsp;

                                {moment(publishedAt).fromNow() === "a day ago" ? "1 day ago" : moment(publishedAt).fromNow()}
                            </span>
                        </div>
                    }

                    {/* Will Show Description of a channel or video  Only IF it is SearchScreen or Subscription Page Screen or LikedVideoPage*/}
                    {(SearchScreen || likedVideoScreen || subpsScreen) && <p className='mt-1 video-vertical-description'>{description}</p>}


                    <div className="video-vertical-channel d-flex align-items-center">
                        
                        {/* Will Show Icon of a channel Only IF it is SearchScreen*/}
                        {(SearchScreen || likedVideoScreen) && (
                            <LazyLoadImage src={channelIcon} effect="blur"
                            />
                        )}
                        &nbsp;&nbsp;
                        <p className='mt-2 mb-0'>{channelTitle}</p>

                    </div>

                    {/* Will Show Total Videos Count of a channel Only IF it is Subscription Page Screen */}
                    {subpsScreen && (
                        <p className='mt-2'>
                            {video.contentDetails.totalItemCount}&nbsp;Videos
                        </p>
                    )}


                </div>
            </Col>
        </Row>
    )
}

export default VideoVertical
