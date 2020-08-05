import React,{ useState } from "react";

import "./styles.css";

import '../../global.css';

import api from "../../services/api"

import { useHistory } from "react-router-dom";

import cookie from "../../services/cookies"

import HeaderProfile from "../../components/HeaderProfile"
 
const Profile = () => {

    const history = useHistory();
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    const checkToken = async event => {

        event.preventDefault();

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

    return(
        <div className="container-profile" onClick={checkToken}>
            <HeaderProfile name={user.name}/>
            {token}
        </div>
    )
}

export default Profile;