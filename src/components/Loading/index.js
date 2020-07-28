import React from 'react';

import './styles.css'

const Loading = (on) => {

    const hidden = on;

    const handleLoading = action => {

        const divElement = document.querySelector(".loading");

        if(action === false)
            divElement.style.display("none");
        else
            divElement.style.display("block");     
    }

    return(
        <div className="loading" onLoad={handleLoading(hidden)}>
            <div className="box">
                <div className="circle1"></div>
            </div>
            <div className="box">
                <div className="circle2"></div>
            </div>
            <div className="box">
                <div className="circle3"></div>
            </div>
        </div>
    )
   
}

export default Loading;