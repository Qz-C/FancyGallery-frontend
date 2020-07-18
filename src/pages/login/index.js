import React from "react";

import './styles.css';

import Header from '../../components/Header';

import Footer from '../../components/Footer';

import  LoginFloatBox from '../../components/LoginFloatBox'

import '../../global.css';

import { FiMail } from "react-icons/fi";

import { FiLock } from "react-icons/fi";

const Login = () => {
    return(
        <div className="container">
            <Header/>
            <section>
                <LoginFloatBox/>
                <div className="bottom-div">
                    <form>
                        <div className="inputs">
                            <FiMail size={24} color={'#A520B0'}/>
                            <input type="email"
                                placeholder="Email..."
                            />
                        </div>
                        
                        <div className="inputs">
                            <FiLock size={24} color={'#A520B0'} />
                            <input type="password"
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