import React, {useState} from "react";

import './styles.css';

import Header from '../../components/Header';

import Footer from '../../components/Footer';

import  LoginFloatBox from '../../components/LoginFloatBox'

import '../../global.css';

import { FiMail } from "react-icons/fi";

import { FiLock } from "react-icons/fi";

import api from "../../services/api";

import Loading from "../../components/Loading";

import { Link, useHistory } from "react-router-dom"

import cookie from "../../services/cookies"

const Login = () => {


    const [ loginError, setLoginError] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showLoading, setShowLoading] = useState(false);

    const history = useHistory();

    const handleLogin = async event =>{

        setShowLoading(true);

        event.preventDefault();

        await api.post('/user/authenticate', {
            email: email.toLowerCase(),
            password: password
        }).then( response => {
            setShowLoading(false);
            setLoginError(" ");

            cookie.setCookie("token", response.data.token, 10*365);
            
            history.push('/profile');


        }).catch(error => {
            setShowLoading(false);
            if(error.response)
            {
                switch(error.response.status)
                {
                    
                    case 400: console.log(error.response.data.error);
                               setLoginError(error.response.data.error);
                               break;
                    case 401: console.log(error.response.data.error);
                                setLoginError(error.response.data.error);
                                break;
                    default: break;
                }
            }else if(error.request)
                setLoginError("Server unreachable, try again later");
        });
    }

    const clearForm = event => {
        if( loginError !== "" )
        {
            setLoginError("");
            document.getElementById("form").reset();
        }
    }

    const registrate = () => {
        history.push('/register');
    }

    return(
        <div className="container-login">
            <Header/>
            <section>
                <LoginFloatBox text={"Log in"}/>
                <div className="bottom-div">
                    <form id="form" onSubmit={handleLogin} onClick={clearForm}>
                        <div className="inputs">
                            <FiMail size={24} color={'#A520B0'}/>
                            <input onChange={event => setEmail(event.target.value)}
                                type="email"
                                placeholder="Email..."
                            />
                        </div>
                        
                        <div className="inputs">
                            <FiLock size={24} color={'#A520B0'} />
                            <input onChange={event => setPassword(event.target.value)}
                                type="password"
                                placeholder="Passwrod..."
                            />
                        </div>
                        <div className="error-message">
                            {/* Show the component if the state is true */}
                            { showLoading && <Loading/> }
                            { loginError }
                        </div>
                        <div className="buttons">
                            <input value="Log in" type="submit" id="login-button" />
                            <button onClick={registrate}>
                                    Sign Up
                            </button>
                            
                        </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Login;