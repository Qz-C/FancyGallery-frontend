import React,{ useState } from "react";

import "./styles.css";

import '../../global.css';

import api from "../../services/api"

import { useHistory } from "react-router-dom";

import cookie from "../../services/cookies"
 
const Profile = () => {

    const history = useHistory();
    const [token, setToken] = useState("");

    const checkToken = async event => {

        event.preventDefault();

        const token = cookie.getCookie("token");

        if( token === "")
            history.push('/');

        await api.get('/user/validatetoken', {
            headers: {
                Authorization : `Bearer ${token}`}
            }).then ( () => {
                setToken(token);
            }).catch( () => {
                history.push('/');
            })
        }

    return(
        <div className="container-profile" onLoad={checkToken}>
            {token}
        </div>
    )
}

export default Profile;