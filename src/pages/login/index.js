import React from "react";

import './styles.css';

import '../../global.css';

import { FaCamera } from "react-icons/fa";

import { FaFacebookSquare } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa";

import { FaTwitter } from "react-icons/fa";

import { FaGoogle } from "react-icons/fa"

import { FiMail } from "react-icons/fi";

import { FiLock } from "react-icons/fi";



import backgroundImg from "../../assets/background.png"

const Login = () => {
    return(
        <div className="container">
            <img src={backgroundImg} alt="background"/>
            <header>
                <div className="logo">
                    <FaCamera size={22}/>
                    <h1> FancyGallery </h1>
                </div>
                <div className="social-media">
                    <FaFacebookSquare size={22}/>
                    <FaInstagram size={22}/>
                    <FaTwitter size={22}/>
                </div>
            </header>
            <section>
                <div className="upper-div">
                    <h3> Log in </h3>
                    <div className="miniSocial">
                        <FaFacebookSquare size={18}/>
                        <FaTwitter size={18}/>
                        <FaGoogle size={18}/>
                    </div>
                </div>
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
            <footer>
                <p> &#169; Made by Ezequiel Fonseca </p>
            </footer>
        </div>
    )
}

export default Login;