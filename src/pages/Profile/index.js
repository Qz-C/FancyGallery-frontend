import React,{ useState, useEffect } from "react";

import "./styles.css";

import '../../global.css';

import api from "../../services/api"

import { useHistory, Link } from "react-router-dom";

import cookie from "../../services/cookies"

import HeaderProfile from "../../components/HeaderProfile";
 
const Profile = () => {

    const SERVER_BASE_URL = 'http://localhost:3333/'

    const history = useHistory();
    const [token, setToken] = useState(cookie.getCookie("token"));
    const [user, setUser] = useState();
    const [pictures, setPictures] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

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
        console.log("user rodou")
    }, [token]);

    useEffect ( () => {
        api.get(`/img/list?page=${page}`, {
            headers: {
                Authorization : `Bearer ${token}`}
            }).then ( response => {
                setPictures(response.data.imgList);
                console.log(response.data);
            }).catch (error => {
                console.log(error)
            })
            console.log("img rodou");
        }, [page]);
        
    return(

        <div id="container-profile">
            { user && <HeaderProfile name={user.name}/>}
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
        </div>
    )
}

export default Profile; 