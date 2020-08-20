import React from "react";

import "./styles.css";

import '../../global.css';

const Image = props => {
    return(
        <div className="modal-container">
            <div className="modal-img"> 
                <img src={props.url} alt={props.name}/>
            </div>
        </div>
    )
}

export default Image;