import React from "react";

import { FiCheck } from "react-icons/fi";

import { FiX } from "react-icons/fi";

import "./styles.css";

const ValidatingPasswordConfirmation = props => {
    console.log(props);
    return(
        <div className="message-box">
            <div className="double-row">
            <div className="message" >
                <div> { !props.matched && <FiX color={"red"} size={12}/>} 
                      { props.matched && <FiCheck color={"green"} size={12}/>} 
                </div>
                <p> The password must match </p>

            </div>
        </div>
    </div>
    )
}

export default ValidatingPasswordConfirmation;