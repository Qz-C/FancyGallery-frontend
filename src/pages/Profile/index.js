import React,{ useState, useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import "./styles.css";

import '../../global.css';

import api from "../../services/api"

import { useHistory, Link } from "react-router-dom";

import cookie from "../../services/cookies"

import HeaderProfile from "../../components/HeaderProfile";

import Loading from "../../components/Loading"

import Image from "../../pages/Image"
 
const Profile = () => {

    const SERVER_BASE_URL = 'http://localhost:3333/'
    const itemsPerPage = 9;
    const history = useHistory();
    const [token, setToken] = useState(cookie.getCookie("token"));
    const [user, setUser] = useState();
    const [pictures, setPictures] = useState([]);
    const [page, setPage] = useState(1);
    const [keepShowingScroll , setKeepShowingScroll] = useState(true)
    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState({});


    //On first load and logout
    useEffect( () => {
        if( token === "")
            history.push('/');
        api.get('/user/get', {
            headers: {
            Authorization : `Bearer ${token}`}
        }).then ( response => {
            setToken(token);
            setUser(response.data);
        }).catch( () => {
            history.push('/');
        })
    }, [token, history]);

    const fetchData = () => {
        api.get(`/img/list?page=${page}&items=${itemsPerPage}`, {
            headers: {
                Authorization : `Bearer ${token}`}
        }).then ( response => {
            if(response.data.length !== 0)
            {
                setPage(page+1);
                setPictures([...pictures, ...response.data.imgList]);
            }else
                setKeepShowingScroll(false);

        }).catch (error => {
            console.log(error)
        })
    }

    //Load the pictures
    useEffect ( () => {
            fetchData();
        },[]);

    

    const imagePopUp = (picture, url, index) => {
        setShowImage(true);
        setImage({
            id: picture.id,
            name: picture.name,
            url: url,
            size: picture.size,
            updated_at : picture.updated_at,
            created_at : picture.created_at,
            format: picture.format,
            index: index
        })
    }

    const deleteSingleimage = id => {
        const pics = pictures.filter(picture => {
            if( id !== picture.id )
                return picture;
        })
        setPictures(pics);
    }

    const clearToken = () => {
        cookie.setCookie("token", "", -10000)
        setToken("");
    }

    const updateOnUpload = picture => {
        const pics = pictures;
        pics.push(picture);
        setPictures(pics);
    }
 
    return(

        <div id="container-profile">
            { user && <HeaderProfile name={user.name} deAuth={clearToken} updateOnUpload={updateOnUpload}/>}
            
            {(!pictures || pictures.length === 0) ?
                <main className = "no-imgs">
                        <h1> You have no images here yet. </h1>
                </main> :
                <InfiniteScroll
                    dataLength={pictures.length}
                    loader={<Loading referenceSize={3}/>}
                    next={fetchData}
                    hasMore={ keepShowingScroll }
                    scrollableTarget={'container-profile'}
                >
                    <main className="gallery">
                    { pictures.map( (picture, index) => {
                        const url = picture.url;
                        const img = {
                            background:`url(${url}) no-repeat center center`
                        } 

                        return(
                            <Link 
                                style={img} 
                                className="link"
                                to="#"
                                key={picture.id}
                                onClick={() => imagePopUp(picture, url)}
                            >
                                <div className="img" 
                                    id={`img-${index}`}>
                                </div>
                            </Link>
                        )
                    })}
                </main>

                {showImage && <Image 
                    image={image} 
                    onClose={() => {setShowImage(false)} }
                    token={token}
                    deleteSingle={deleteSingleimage}/>
                }
                </InfiniteScroll>}
        </div>
    )
}

export default Profile; 