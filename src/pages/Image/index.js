import React from "react";

import "./styles.css";

import '../../global.css';

import {FiEdit2} from "react-icons/fi"

import {FiTrash2} from "react-icons/fi"

import {FiDownload} from "react-icons/fi"

import {FiX} from "react-icons/fi"

import { Link } from "react-router-dom";

const Image = props => {
    return(
        <div className="modal-container">
            <div className="modal">
                <Link to="#">
                    <FiX size={22} color={'white'}/> 
                </Link>
                <section>
                    <img src={props.url} alt={props.name}/>
                    <div className="menu">
                        <div>
                            
                        </div>
                        <FiTrash2 size={22} color={'white'}/> 
                        <FiDownload size={22} color={'white'}/> 
                        
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Image;