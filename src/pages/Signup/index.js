import React, {useState} from "react";

import Header from '../../components/Header';

import Footer from '../../components/Footer';

import  LoginFloatBox from '../../components/LoginFloatBox'

import { FiMail } from "react-icons/fi";

import { FiLock } from "react-icons/fi";

import { FiUser } from "react-icons/fi";

import "./styles.css";


const Signup = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSignup = event => {
        event.preventDefault();
    }

    return(
        <div className="container">
            <Header/>
            <section>
                <LoginFloatBox/>
                <div className="bottom-div2">
                    <form id="form" onSubmit={handleSignup}>
                        <div className="inputs">
                            <FiUser size={24} color={'#A520B0'}/>
                            <input onChange={event => setEmail(event.target.value)}
                                type="name"
                                placeholder="Name..."
                            />
                        </div>
                        
                        <div className="inputs">
                            <FiMail size={24} color={'#A520B0'} />
                            <input onChange={event => setPassword(event.target.value)}
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

                        <div className="inputs">
                            <FiLock size={24} color={'#A520B0'} />
                            <input onChange={event => setPassword(event.target.value)}
                                type="password"
                                placeholder="Confirm Passwrod..."
                            />
                        </div>

                        <div className="error-message">
                            {/* Show the component if the state is true */}
                        </div>
                        <div className="buttons">
                            <button type="submit" className="button" >
                                Log in
                            </button>
                            <button>
                                Sign Up
                            </button>
                            
                        </div>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Signup;