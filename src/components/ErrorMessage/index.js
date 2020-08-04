import React from "react";

import { FiCheck } from "react-icons/fi";

import { FiX } from "react-icons/fi";

import "./styles.css";

const ErrorMessage = props => {
    return(
        <div className="message-box">
                { !props.matched && <div className="content"> 
                    <FiX color={"red"} size={12}/> 
                    <p>  {props.invalid}</p>
                </div> }
                { props.matched && <div className="content"> 
                    <FiCheck color={"green"} size={12}/> 
                    <p>  {props.valid}</p>
                </div> }
        </div>
    )
}

export default ErrorMessage;