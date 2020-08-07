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
    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const [pictures, setPictures] = useState([]);
    const [count, setCount] = useState(0);


    const checkToken = async () => {

        const localToken = cookie.getCookie("token");

        if( localToken === "")
            history.push('/');

        await api.get('/user/get', {
            headers: {
                Authorization : `Bearer ${localToken}`}
            }).then ( response => {
                setToken(localToken);
                setUser(response.data);
            }).catch( () => {
                history.push('/');
            })
            loadImgs(localToken);
        }

        useEffect( () => {
            if( user === undefined )
            {
                checkToken();
                console.log("Executou");
            }
            console.log("Effect");
                
        }, [user]);

        //useEffect ( () => {
            
        //}, [count])

        const loadImgs = async (token) => { 
            await api.get('/img/list', {
                headers: {
                    Authorization : `Bearer ${token}`}
                }).then ( response => {
                    setPictures(response.data);
                }).catch (error => {
                    console.log(error)
                })
        }

        const controlLoop = () => {
            count < 7 ? setCount(count+1):setCount(0)
        }
        
    return(

        <div id="container-profile">
            { user && <HeaderProfile name={user.name}/>}
            <main className="gallery">
                {pictures.map(picture => {
                        const imgStyle = {
                            background:`(${SERVER_BASE_URL}${user.email}/${picture.name}) no-repeat center center`
                        }
                        
                        //setCount(count+1)
                       
                        return(
                            <Link className="link-box"to="#" key={picture.id}>
                                <div className={`img${count}`} style={imgStyle}>
                                </div>
                            </Link>
                        )
                    })
                }
            </main>
        </div>
    )
}

export default Profile;