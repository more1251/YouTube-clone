import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import request from '../api'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

const VideoComp = ({ video, channelScreen }) => {

    const { 
        id, 
        snippet: {
            channelId, 
            channelTitle, 
            title, 
            publishedAt, 
            thumbnails: { medium }
        },
        contentDetails 
    } = video

    const [views, setViews] = useState(null);

    const [duration, setDuration] = useState(null);

    const [channelIcon, setChannelIcon] = useState(null);

    const seconds = moment.duration(duration).asSeconds()

    const _duration = moment.utc(seconds * 1000).format("mm:ss")

    const _videoId = id?.videoId || contentDetails?.videoId || id


    //Requesting the Details of the video like views,likeS, title at every render
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
        get_videoDetails();
    }, [_videoId])

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

    //Function to navigate us to watchpage by getting the id of the clicked video and to serve that specific video
    const handleVideoClick = () => {
        navigate(`/watch/${_videoId}`);
    }

    



    return (
        <div className="video" onClick={handleVideoClick}>
            <div className="video-top">
                {/* <img width="360" src={medium.url} alt={title} /> */}
                <LazyLoadImage src={medium.url} effect="blur" />
                {_duration === "00:00" ?
                    <span className='video-top-duration' style={{ color: "red", border: "0.5px solid red", padding: "0.1rem" }}>LIVE NOW</span>
                    :
                    <span className='video-top-duration'>{_duration}</span>
                }

            </div>

            <div className="video-title">
                {title}
            </div>

            <div className="video-details">
                <span>
                    <AiFillEye /> {numeral(views).format("0.a").toUpperCase()} Views • &nbsp;
                </span>

                <span>
                    {moment(publishedAt).fromNow() === "a day ago" ? "1 day ago" : moment(publishedAt).fromNow()}
                </span>
            </div>

 
            {/* Here we will see the ChannelIcon and ChannelTitle only If videos are on HomeScreen because it is reused in ChannelScreen */}
            {!channelScreen && (
                <div className="video-channel">
                    <LazyLoadImage src={channelIcon} effect="blur" />
                    <p>{channelTitle}</p>
                </div>
            )}
        </div>
    )
}

export default VideoComp
