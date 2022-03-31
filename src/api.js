import axios from "axios";

const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key: "AIzaSyB689GvGegdm79nObsPE1YAyomZ07H8KUY"
    }

})

export default request