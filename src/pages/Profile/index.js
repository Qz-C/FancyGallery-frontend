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
    const [showImage, setShowImage] = useState(false)

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

    //Load the pictures
    useEffect ( () => {
            fetchData();
        },[]);

        //
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

        const imagePopUp = event => {
            console.log(event);
        }

    return(

        <div id="container-profile">
            { user && <HeaderProfile name={user.name}/>}
            <InfiniteScroll 
                dataLength={pictures.length}
                loader={<Loading/>}
                next={fetchData}
                hasMore={ keepShowingScroll }
            >
                <main className="gallery">
                    {pictures.map( (picture) => {

                            const url = `url(${SERVER_BASE_URL}${user.email}/${picture.name}) no-repeat center center`
                            const img = {
                                background:`${url}`
                            } 

                            return(
                                <Link 
                                    style={img} 
                                    className="link"
                                    to="#"
                                    key={picture.id}
                                    onClick={imagePopUp}
                                >
                                    <div className="img">
                                    </div>
                                </Link>
                            )
                    })}
                </main>
            </InfiniteScroll>
        </div>
    )
}

export default Profile; 