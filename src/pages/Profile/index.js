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
        api.get('/img/list', {
            headers: {
                Authorization : `Bearer ${token}`}
            }).then ( response => {
                setPictures(response.data);
            }).catch (error => {
                console.log(error)
            })
            console.log("img rodou");
        }, []);

    const loop = () => {
        if(count >= 7)
            setCount(0)
        else
            setCount(count + 1)
    }
    
    return(

        <div id="container-profile">
            { user && <HeaderProfile name={user.name}/>}
            <main className="gallery">
                {pictures.map((picture, index ) => {
                        return(
                            <Link className="link" to="#" key={picture.id}>
                               <img 
                                    className="img"
                                    src={`${SERVER_BASE_URL}${user.email}/${picture.name}`}
                                    alt={picture.name}
                               />
                            </Link>
                        )
                })}
            </main>
        </div>
    )
}

export default Profile;