import React from 'react';

import './styles.css'

const Loading = () => {

    return(
        <div className="loading">
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