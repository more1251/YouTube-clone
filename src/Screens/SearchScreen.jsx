import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideobySearch } from "../redux/actions/video.actions";
import { Container } from "react-bootstrap";
import VideoVertical from "../components/VideoVertical";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import HelmetCustom from "../components/HelmetCustom";

const SearchScreen = () => {
    const { query } = useParams();
    const dispatch = useDispatch();

    //Requesting the Video by Search Query
    useEffect(() => {
        dispatch(getVideobySearch(query));
    }, [dispatch, query]);

    const { videos, loading } = useSelector((state) => state.searchedVideos);

    return (
        <Container>
            <HelmetCustom title={`${query}-YouTube`}/>
            {!loading ? (
                videos?.map((video,i) => (
                    <VideoVertical video={video} key={i} SearchScreen />
                ))
            ) : (
                <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="160px" count={20} />
                </SkeletonTheme>
            )}
        </Container>
    );
};

export default SearchScreen;
