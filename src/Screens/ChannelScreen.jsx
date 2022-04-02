import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getVideobyChannel } from '../redux/actions/video.actions';
import { Container, Col, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import VideoComp from '../components/VideoComp'
import { getChannelDetailsId,getSubscriptionStatus } from '../redux/actions/channel.actions';
import numeral from 'numeral'
import { AiFillBell } from "react-icons/ai";
import HelmetCustom from '../components/HelmetCustom';

const ChannelScreen = () => {

    //using Params to use the Id of a video clicked or channel to access its details by its id
    const { channelId } = useParams();

    const dispatch = useDispatch();


    //Requesting the Videos of a Specific Channel,Channel Details,and Subscription Status
    useEffect(() => {
        dispatch(getVideobyChannel(channelId))
        dispatch(getChannelDetailsId(channelId))
        dispatch(getSubscriptionStatus(channelId))
    }, [dispatch, channelId])


    const { videos, loading } = useSelector(state => state.channelVideos)
    const {channel} = useSelector(state => state.channelDetail)
    const subsStatus = useSelector(state=>state.channelDetail.subsStatus);

    return (
        <>

            <div className='px-5 py-2 my-2 d-flex justify-content-between align-items-center channelheader'>
                <HelmetCustom title={`${channel?.video?.snippet?.title}-YouTube`}/>
                <div className='d-flex align-items-center'>
                    <img src={channel?.video?.snippet?.thumbnails?.default?.url} alt='' />
                    <div className='ms-3 channelheader-details'>
                        <h3>{channel?.video?.snippet?.title}</h3>
                        <span>
                            {numeral(channel?.video?.statistics?.subscriberCount).format('0.a').toUpperCase()}&nbsp;
                            subscribers
                        </span>
                    </div>
                </div>

                {subsStatus? 
                    <div className='button-group'> 
                        <button className="btn border-0 p-2 m-2" style={{backgroundColor: "rgba(255, 255, 255, 0.1)", color:"#aaa"}}>Subscribed</button>
                        <AiFillBell size={25} /> 
                    </div>
                :
                   <button className="btn border-0 p-2 m-2">Subscribe</button>
                } 
            </div>


            <Container>
                <Row className="mt-2">
                    {!loading ? (
                        videos?.map((video,i) => (
                            <Col md={4} lg={3} key={i}>
                                <VideoComp video={video} channelScreen />
                            </Col>
                        ))
                    ) : (

                        [...Array(20)].map(() => (
                            <Col lg={3} md={4}>
                                <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
                                    <Skeleton width="100%" height="140px" />
                                </SkeletonTheme>
                            </Col>
                        ))
                    )
                    }
                </Row>
            </Container>
        </>
    )
}

export default ChannelScreen
