import React,{ useState, useEffect } from "react";

import "./styles.css";

import '../../global.css';

import api from "../../services/api"

import { useHistory } from "react-router-dom";

import cookie from "../../services/cookies"

import HeaderProfile from "../../components/HeaderProfile"
 
const Profile = () => {

    const history = useHistory();
    const [token, setToken] = useState("");
    const [user, setUser] = useState([]);
    const [pictures, setPictures] = useState([]);

    const checkToken = async () => {

        const token = cookie.getCookie("token");

        if( token === "")
            history.push('/');

        await api.get('/user/get', {
            headers: {
                Authorization : `Bearer ${token}`}
            }).then ( response => {
                setToken(token);
                setUser(response.data);
            }).catch( () => {
                history.push('/');
            })
        }

        useEffect( () => {
            if( user.length === 0 )
                window.onload=checkToken;
        })

        const LoadImgs = async ()=> {
            await api.get('/img/list', {
                headers: {
                    Authorization : `Bearer ${token}`}
                }).then ( response => {
                    setPictures(response.data);
                    console.log(response.data);
                })
        }
        
    return(

        <div id="container-profile" onClick={LoadImgs}>
            <HeaderProfile name={user.name}/>
            <main className="gallery">
                {token}

            </main>
        </div>
    )
}

export default Profile;