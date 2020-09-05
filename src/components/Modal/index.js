import React from "react";

import "./styles.css";

import '../../global.css';

import {FiX} from "react-icons/fi"

import { Link } from "react-router-dom";

const Modal = props => {
    return(
      <div className="modal-container">
            <div className="modal">
                <Link to="#" className="close-button" onClick={props.onClose}>
                    <FiX  onClick={props.onClose} size={22} color={'white'}/> 
                </Link>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;