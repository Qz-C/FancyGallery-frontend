import React, {useState, useEffect} from "react";

import Header from '../../components/Header';

import Footer from '../../components/Footer';

import  LoginFloatBox from '../../components/LoginFloatBox'

import { FiMail } from "react-icons/fi";

import { FiLock } from "react-icons/fi";

import { FiUser } from "react-icons/fi";

import { FiX } from "react-icons/fi"

import ValidatingPasswordMessages from "../../components/ValidatingPasswordMessages"

import ErrorMessage from "../../components/ErrorMessage";

import "./styles.css";

import '../../global.css';

import Loading from "../../components/Loading"

import api from "../../services/api"

import { useHistory } from "react-router-dom"

import cookie from "../../services/cookies"

const Signup = () => {

    //These states stores the inputs from the user
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const [ showButton, setShowButton ] = useState(true);
    const [ showLoading, setShowLoading ] = useState (false);
    const [ errorRequest, setErrorRequest ] = useState("");

    //These states are send to the compenent ValidatingPasswordMessages
    //in order to render the correct status of each password requirement
    const [ size, setSize ] = useState(false);
    const [ number, setNumber ] = useState(false);
    const [ lower, setLower ] = useState(false);
    const [ upper, setUpper ] = useState(false);
    const [ special, setSpecial ] = useState(false);
    
    //These states are send to the compenent ValidatingPasswordMessages
    //in order to render the correct status of each password requirement
    const [ passwordMatched, setPasswordMatched ] = useState(false);
    const [ nameMatched, setNameMatched ] = useState(false);
    const [ emailMatched, setEmailMatched ] = useState(false);


    //State to control the rendering of the component ValidatingPasswordMessages
    const [showValidatePasswordMessage, setShowValidatePasswordMessage] = useState(false);

    //These states controls the rendering of the component ErrorMessage 
    const [showPassWordMatches, setShowPassWordMatches ] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showNameError, setShowNameError] = useState(false);
   
    const history = useHistory();

    //search for any ocurrency of a lowercase
    const hasLowerCase = str => {
        return (/[a-z]/.test(str));
    }

    //search for any ocurrency of a number
    const hasNumber =  str => {
        return (/[0-9]/.test(str));
    }

    //serach for any special chars
    const hasSpecialChar =   str => {
        return (/[<>\\\|!"@#\$%&\*\?'\+=\-\(\)\{}\[\]\.;:/]/.test(str));
    }

    //search for any ocurrency of a uppercase
    const hasUpperCase =  str => {
        return (/[A-Z]/.test(str));
    }

    //To a email be valit it must contains at least one ocorrency of '@' and one of '.'
    const isEmailValid =   str => {
        let at =  (/@/.test(str));
        let dot = (/\./.test(str));
        return ( at && dot );
    }   
    

    //function to validate the password
    const handlePasswordValidation = event => {

        

        const validatingPassword = event.target.value;

        let local = { size:false, number:false, upper:false, lower:false, special:false }
        //In order to fillup the password state correctly at the end of the function
        //this local object is necessary, if instead of this object the states would be used 
        //it would fillup the password incorrect, because the "setState" only update the 
        //state on next re-render, and it must be checked after the DOM re-render

        if ( validatingPassword.length > 7 ){   
            setSize(true);
            local.size=true;
        }else{
            setSize(false);
            local.size=false;
        }
           
        if(hasNumber(validatingPassword)){
            setNumber(true);
            local.number = true;
        }else{
            setNumber(false);
            local.number = false;
        }

        if(hasLowerCase(validatingPassword)){
            setLower(true);
            local.lower = true;
        }else{
            setLower(false);
            local.lower = false;
        }

        if(hasUpperCase(validatingPassword)){
            setUpper(true);
            local.upper = true;
        }else{
            setUpper(false);
            local.upper = false;
        }

        if(hasSpecialChar(validatingPassword)){
            setSpecial(true);
            local.special = true;
        }else{
            setSpecial(false);
            local.special = false;
        }

        //if all the requeriments matches, then store the password on password state
        if( local.number && local.size && local.upper && local.lower && local.special )
             setPassword(validatingPassword);
    }

    

    //render the component ValidatingPasswordMessages on DOM,
    //which show relevant information regading the password params
    const passwordOnFocus = event => {
        setShowValidatePasswordMessage(true);
    }

    //render the ValidatingPasswordConfimation component on DOM,
    //which show if the password confirmation is valid or not
    const passwordValidationOnFocus = event => {
        setShowPassWordMatches(true);
    }

    //Hide the component ValidatingPasswordMessages
    const passwordOnBluir = event => {
        if( size && number && lower && upper && special )
            setShowValidatePasswordMessage(false);
    }

    //Hide the component ValidatingPasswordConfimation
    const passwordValidationOnBluir = event => {
        if( password !== "" && password === confirmPassword )
            setShowPassWordMatches(false);
    }

    //This function if all the fields are properly filled it enables the Submit button
    useEffect ( () => {
        const submitBtn = document.getElementById("submitSignUp");

        if( (password !== "") && passwordMatched && (email !== "") && (name !== "") )
            submitBtn.disabled = false;
        else
            submitBtn.disabled = true;
    }, [email, name, password, passwordMatched] )

    //This function validates the name
    const handleName = event => {
        setName(event.target.value)
        
        if( event.target.value ) 
            setNameMatched(true);
        else
            setNameMatched(false);
            
    }

    //If the name is not valid, this function change the state 
    //to NameError to render the error menssage
    const nameOnBlur = () => {
        if(name !== "")
            setShowNameError(false);
        else{
            setShowNameError(true);
            setNameMatched(false);
        }
            
    }

     //This function validates the email
    const handleEmail = event => {
        setEmail(event.target.value)
        
        if(  event.target.value && isEmailValid(event.target.value) ) 
            setEmailMatched(true);
        else
            setEmailMatched(false);
            
    }

    //If the email is not valid, this function changes the state 
    //to EmailError to render the error menssage
    const emailOnBlur = () => {
        if(email !== "" && isEmailValid(email) )
            setShowEmailError(false);
        else{
            setShowEmailError(true);
            setEmailMatched(false);
        }    
    }

    //check if the password confirmation matches
    const handlePasswordConfirmation = event  => {
        setConfirmPassword(event.target.value);
        if(event.target.value === password && password !== "")
            setPasswordMatched(true);
        else
            setPasswordMatched(false);
    }


    const handleSubmit = async event => {

        event.preventDefault();

        //Hidden all error components
        setShowEmailError(false);
        setShowPassWordMatches(false);
        setShowNameError(false);
        setShowValidatePasswordMessage(false);

        setShowButton(false);
        setShowLoading(true);

        await api.post("/user/register",{
            name: name,
            email: email.toLowerCase(),
            password: password
        }).then (response => {

                document.cookie = `token = ${response.data.token}`

                history.push('/profile');

            }
        ).catch(error => {

                setShowLoading(false);
                setShowButton(true);

                //It Ensures that all the states will be reseted
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setSize(false);
                setNumber(false);
                setLower(false);
                setSpecial(false);
                setNumber(false);
                setUpper(false);


                if (error.response)
                    setErrorRequest(error.response.data.error);
                else if(error.request)
                    setErrorRequest("Server unreachable, try again later");
                    
                console.log(error);
            
            }
        )
    }

    const clearForm = () => {
        if( errorRequest !== "" )
        {
            setErrorRequest("");
            document.getElementById("form").reset();
        }
    }

    


    return(
        <div className="container-signup">
            <Header/>
            <section>
                <LoginFloatBox/>
                <div className="bottom-div">
                    <form id="form" onSubmit={handleSubmit} onClick={clearForm}>
                        <div className="inputs">
                            <FiUser size={24} color={'#A520B0'}/>
                            <input 
                                onChange={handleName}
                                onBlur={nameOnBlur}
                                type="name"
                                placeholder="Name..."
                            />
                        </div>

                        { showNameError && <ErrorMessage 
                                matched={nameMatched}
                                valid={"Ok"}
                                invalid={"The field name can not be empty"}
                        />}

                        <div className="inputs" >
                            <FiMail size={24} color={'#A520B0'} />
                            <input 
                                
                                onChange={handleEmail}
                                onBlur={emailOnBlur} 
                                type="email"
                                placeholder="Email..."
                            />
                        </div>

                        { showEmailError && <ErrorMessage 
                                matched={emailMatched}
                                valid={"Ok"}
                                invalid={"The email is not valid, please try again"}
                        />}

                        <div className="inputs">
                            <FiLock size={24} color={'#A520B0'} />
                            <input onChange={handlePasswordValidation}
                                onFocus = {passwordOnFocus}
                                onBlur = {passwordOnBluir}
                                type="password"
                                placeholder="Password..."
                            />

                            </div> <div className="render-messages">
                           
                            {/* This below will render the component if showValidatePasswordMessage is "true" */}
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
                            <input onChange={handlePasswordConfirmation}
                                onFocus = {passwordValidationOnFocus}
                                onBlur = {passwordValidationOnBluir}
                                type="password"
                                placeholder="Confirm Password..."
                               
                            />
                        </div>

                        {/* This below will render the component if ErrorMessage is "true" */}
                        { showPassWordMatches && <ErrorMessage 
                                matched={passwordMatched}
                                valid={"ok"}
                                invalid={"The password does not matches"}
                        />}

                        <div className="start">
                            { showButton && <button type="submit" id="submitSignUp" disabled >GET STARTED</button>}
                            { showLoading && <Loading> </Loading> }

                        </div>

                        { errorRequest !== "" && <div className="message-box">
                            <div className="content"> 
                                <FiX color={"red"} size={12}/> 
                                <p>  {errorRequest}</p>
                            </div>
                        </div>}
                    


                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Signup;
