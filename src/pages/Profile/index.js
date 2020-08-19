import React,{ useState, useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import "./styles.css";

import '../../global.css';

import api from "../../services/api"

import { useHistory, Link } from "react-router-dom";

import cookie from "../../services/cookies"

import HeaderProfile from "../../components/HeaderProfile";

import Loading from "../../components/Loading"
 
const Profile = () => {

    const SERVER_BASE_URL = 'http://localhost:3333/'
    const itemsPerPage = 9;
    const history = useHistory();
    const [token, setToken] = useState(cookie.getCookie("token"));
    const [user, setUser] = useState();
    const [pictures, setPictures] = useState([]);
    const [page, setPage] = useState(1);
    const [keepShowingScroll , setKeepShowingScroll] = useState(true)

    //On first load and logout
    useEffect( () => {
        console.log("User running...")
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
        console.log("User finished !!!")
    }, [token, history]);

    //Load the pictures
    useEffect ( () => {
            
        },[]);

        //
        const fetchData = () => {
                console.log()
                api.get(`/img/list?page=${page}&items=${itemsPerPage}`, {
                headers: {
                    Authorization : `Bearer ${token}`}
                }).then ( response => {
                    if(response.data !== [])
                    {
                        setPage(page+1);
                        setPictures([...pictures, ...response.data.imgList]);
                        console.log(response.data);
                    }else{
                        setKeepShowingScroll(false);
                        console.log("Ñ mexi no pictures");
                    }
                        
                        
                }).catch (error => {
                    console.log(error)
                })
        }

    return(

        <div id="container-profile">
            { user && <HeaderProfile name={user.name}/>}
            <InfiniteScroll 
                dataLength={itemsPerPage}
                next={fetchData}
                hasMore={ keepShowingScroll }
                loader={<Loading/>}
                endMessage={<h1>END !</h1>}
            >
                
                {console.log(keepShowingScroll)}
                <main className="gallery">
                    {pictures.map(picture => {

                            const img = {
                                background:`url(${SERVER_BASE_URL}${user.email}/${picture.name}) no-repeat center center`
                            } 

                            return(
                                <Link style={img} className="link" to="#" key={picture.id}>
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