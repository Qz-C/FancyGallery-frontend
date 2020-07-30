import React, {useState} from "react";

import Header from '../../components/Header';

import Footer from '../../components/Footer';

import  LoginFloatBox from '../../components/LoginFloatBox'

import { FiMail } from "react-icons/fi";

import { FiLock } from "react-icons/fi";

import { FiUser } from "react-icons/fi";

import { Link } from "react-router-dom"

import ValidatingPasswordMessages from "../../components/ValidatingPasswordMessages"

import "./styles.css";

const Signup = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");
    const [ confirmPassword, setConfirmPasswrod ] = useState("");
    const [ size, setSize ] = useState(false);
    const [ number, setNumber ] = useState(false);
    const [ lower, setLower ] = useState(false);
    const [ upper, setUpper ] = useState(false);
    const [ special, setSpecial ] = useState(false);
    const [ showValidatePasswordMessage, setShowValidatePasswordMessage] = useState(false)

    const hasLowerCase = str => {
        return (/[a-z]/.test(str));
    }

    const hasNumber = str => {
        return (/[0-9]/.test(str));
    }

    const hasSpecialChar = str => {
        return (/[<>\\\|!"@#\$%&\*\?'\+=\-\(\)\{}\[\]\.;:/]/.test(str));
    }
    const hasUpperCase = str => {
        return (/[A-Z]/.test(str));
    }
    

    const handlePasswordValidation = event => {

        setShowValidatePasswordMessage(true);

        const validatingPassword = event.target.value;

        console.log(validatingPassword.length)

        if ( validatingPassword.length > 8 )
            setSize(true);
        else   
            setSize(false);
           
        if(hasNumber(validatingPassword))
            setNumber(true);
        else
            setNumber(false)

        if(hasLowerCase(validatingPassword))
            setLower(true);
        else
            setLower(false)
        
        if(hasUpperCase(validatingPassword))
            setUpper(true);
        else
            setUpper(false);

        if(hasSpecialChar(validatingPassword))
            setSpecial(true)
        else
            setSpecial(false)

        if( size && number && lower && upper && special )
        {
            setPassword(validatingPassword);
            console.log(password)
            
        }
        
        
    }
    
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
                            <input onChange={event => setName(event.target.value)}
                                type="name"
                                placeholder="Name..."
                            />
                        </div>

                        <div className="inputs">
                            <FiMail size={24} color={'#A520B0'} />
                            <input onChange={event => setEmail(event.target.value)}
                                type="email"
                                placeholder="Email..."
                            />
                        </div>

                        <div className="inputs">
                            <FiLock size={24} color={'#A520B0'} />
                            <input onChange={handlePasswordValidation}
                                type="password"
                                placeholder="Passwrod..."
                            />
                        </div>
                      
                        
                        <div className="render-messages">

                            { showValidatePasswordMessage && <ValidatingPasswordMessages 
                                size={size}
                                number={number}
                                upper={upper}
                                lower={lower}
                                special={special}
                            />}

                        </div>
                        <div className="inputs">
                            <FiLock size={24} color={'#A520B0'} />
                            <input onChange={event => setConfirmPasswrod(event.target.value)}
                                type="password"
                                placeholder="Confirm Passwrod..."
                            />
                        </div>
                        <Link className="start" type="submit" to="#">
                            <p>GET STARTED</p>
                        </Link>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Signup;