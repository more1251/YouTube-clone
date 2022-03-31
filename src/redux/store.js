import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { authReducer } from './reducers/auth.reducer';
import { ChannelDetailReducer, SubscriptionChannelReducer } from './reducers/channel.reducer';
import { CommentListReducer } from './reducers/comments.reducer';
import { ChannelPageVideoReducer, homeVideosReducer, LikedVideoReducer, RelatedVideoReducer, SearchedVideoReducer, SelectedVideoReducer } from './reducers/videos.reducer';

const reducer = combineReducers({
    auth : authReducer,
    homeVideos: homeVideosReducer,
    selectedVideo: SelectedVideoReducer,
    channelDetail: ChannelDetailReducer,
    commentList: CommentListReducer,
    relatedVideos: RelatedVideoReducer,
    searchedVideos: SearchedVideoReducer,
    SubscriptionChannel: SubscriptionChannelReducer,
    channelVideos: ChannelPageVideoReducer,
    likedVideos: LikedVideoReducer
})

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;