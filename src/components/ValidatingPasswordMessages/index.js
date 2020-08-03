import React from "react";

import { FiCheck } from "react-icons/fi";

import { FiX } from "react-icons/fi";

import "./styles.css";

const ValidatingPasswordMessages = props => {
    console.log(props);
    return(
        <div className="message-box1">
            <div className="double-row">
                <div className="message" >
                    <div> { !props.size && <FiX color={"red"} size={12}/>} 
                          { props.size && <FiCheck color={"green"} size={12}/>} 
                    </div>
                    <p> 8 characters long </p>
                </div>
                <div className="message" >
                    <div> { !props.number && <FiX color={"red"} size={12}/>} 
                          { props.number && <FiCheck color={"green"} size={12}/>} 
                    </div>
                    <p> 1 Number </p>
                </div>
            </div>
            <div className="double-row"> 
                <div className="message" >
                     <div> { !props.lower && <FiX color={"red"} size={12}/>} 
                           { props.lower && <FiCheck color={"green"} size={12}/>} 
                    </div>
                    <p> 1 lowercase </p>
                </div>
                <div className="message" >
                    <div> { !props.upper && <FiX color={"red"} size={12}/>} 
                          { props.upper && <FiCheck color={"green"} size={12}/>} 
                    </div>
                    <p> 1 uppercase </p>
                </div>
            </div>
            <div className="single-row">
                <div className="message" >
                    <div> { !props.special && <FiX color={"red"} size={12}/>} 
                          { props.special && <FiCheck color={"green"} size={12}/>} 
                    </div>
                    <p> 1 Special character e.g.( ! @ % ? $ * # ... )  </p>
                </div>
            </div>
        </div>
    )
}

export default ValidatingPasswordMessages;