import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CommentsComp from '../components/CommentsComp'
import VideoMetaData from '../components/VideoMetaData'
import VideoVertical from '../components/VideoVertical'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRelatedVideos, getVideoById } from '../redux/actions/video.actions'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const WatchScreen = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    //Requesting the Videos and Related Videos of Requested Video
    useEffect(() => {
        dispatch(getVideoById(id));
        dispatch(getRelatedVideos(id));
    }, [dispatch, id])

    const { video, loading } = useSelector(state => state.selectedVideo);

    // eslint-disable-next-line no-unused-vars
    const { videos, loading: relatedVideoLoading } = useSelector(state => state.relatedVideos)


    return (
        <Row>
            <Col lg={8}>

                <div className="watchScreen-player">
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder="0"
                        title={video?.snippet?.title}
                        allowFullScreen
                        allow="accelerometer;
                        clipboard-write;picture-in-picture"
                        width='100%'
                        height='100%'
                    >
                    </iframe>
                </div>

                {
                    !loading ? <VideoMetaData video={video} videoId={id} /> : <h6>Loading.</h6>
                }

                <CommentsComp videoId={id} totalComments={video?.statistics?.commentCount}
                />
            </Col>

            <Col lg={4}>

                {!loading ? videos?.filter((video) => video.snippet)
                    .map((video) =>
                        <VideoVertical video={video} key={video.id.videoId} WatchScreen/>
                    )
                    :
                    <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
                        <Skeleton width="100%" height="130px" count={15} />
                    </SkeletonTheme>
                }
            </Col>
        </Row >
    )
}

export default WatchScreen
