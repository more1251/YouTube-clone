import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideobyCatg } from '../redux/actions/video.actions';
import ScrollContainer from 'react-indiana-drag-scroll'


//Categories Containing All Categories to Search For
const Categories = [
    'All',
    'Mixes',
    'Sci-fi',
    'Batman',
    'ReactJs',
    'Cricket',
    'Thrillers',
    'Live',
    'Music',
    'Gaming',
    'Courses',
    'Machine Learning',
    'Recently Uploaded',
    'Data Structures',
    'Songs',
    'Doctor Strange',
    'Marvel',
    'Sony',
    'Shark Tank India',
    'REST API',
    'Node.js',
    'CodeWithHarry',
    'ICC',
    'New to You',
    'Watched',


]


const CategoriesList = () => {

    const [activeEle, setActiveEle] = useState('All');

    const dispatch = useDispatch()
    

    //Handle Category Function For Fetching the Videos By Category
    const handleClick = (catg) => {
        setActiveEle(catg);


        // GETTING POPULAR VIDEOS BY Categories using Dispatch
        if (catg === "All") {
            dispatch(getPopularVideos())
        }
        else {
            dispatch(getVideobyCatg(catg))
        }

    }
    
    return (
        <div className="catergory-list">


            {/* Maping the Categories from the Categories array */}
            <ScrollContainer className="scroll-container p-2 mt-2">
                {Categories.map((catg, i) => (
                    <span onClick={() => handleClick(catg)} className={activeEle === catg ? 'active' : ''} key={i}>{catg}</span>
                ))}
            </ScrollContainer>

        </div>




    )
}

export default CategoriesList
