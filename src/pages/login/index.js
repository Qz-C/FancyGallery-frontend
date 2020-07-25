import React, {useState} from "react";

import './styles.css';

import Header from '../../components/Header';

import Footer from '../../components/Footer';

import  LoginFloatBox from '../../components/LoginFloatBox'

import '../../global.css';

import { FiMail } from "react-icons/fi";

import { FiLock } from "react-icons/fi";

import api from "../../services/api"



const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    
    const renderError = err => (
        <p> {err} </p>
    );

    const handleLogin = async event =>{
        event.preventDefault();

        try{
            await api.post('/user/authenticate', {
                email: email,
                password: password
            }).then( response => {
                console.log(response.data.token);
            })

        }catch(err){
            alert(err);
            renderError(err); 
        }
        
    }

    return(
        <div className="container">
            <Header/>
            <section>
                <LoginFloatBox/>
                <div className="bottom-div">
                    <form onSubmit={handleLogin}>
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
                        
                        <div className="buttons">
                            <button type="submit" className="button" >
                                Log in
                            </button>
                            <button className="button" >
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