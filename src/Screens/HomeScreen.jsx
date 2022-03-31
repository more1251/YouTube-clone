import React,{useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesList from '../components/CategoriesList'
import VideoComp from '../components/VideoComp'
import { getPopularVideos,getVideobyCatg} from '../redux/actions/video.actions'
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVid from '../components/SkeletonVid'
import { Helmet } from 'react-helmet'

const HomeScreen = () => {


    const dispatch = useDispatch();

    //Requesting the Videos from the reducer
    useEffect(() => {
        dispatch(getPopularVideos())
    }, [dispatch])
    
    const {videos, activeCategory,loading} = useSelector(state=>state.homeVideos);
    
    //Fetch the Data by Category
    const fetchData = ()=>{

        if (activeCategory === 'All') {
            dispatch(getPopularVideos())
        }
        else{
            dispatch(getVideobyCatg(activeCategory))
        }

       
    }
    
    
    return (
        <div>
            <Container>
                <Helmet title="YoutubeClone-Home"/>
                <CategoriesList/>

                <Row className="">
                <InfiniteScroll
                    dataLength={videos.length}
                    next={fetchData}
                    hasMore={true}
                    loader={
                        <div className='spinner-border text-danger d-block mx-auto'>
                        </div>
                    }
                    className='row'
                >
                    {!loading ? videos.map((video)=>(
                        
                        <Col lg={3} md={4} key={video.id?.videoId || video.id}>
                            <VideoComp video={video}/>
                        </Col>
                        
                    ))
                    :
                    [...Array(20)].map(()=>(
                    <Col lg={3} md={4}>
                      <SkeletonVid/>
                    </Col>
                    ))
                    }
                </InfiniteScroll>
                </Row>
            </Container>
        </div>
    )
}

export default HomeScreen
