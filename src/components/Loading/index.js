import React from 'react';

import './styles.css'

const Loading = (props) => {

    const {referenceSize=1} =  props

    const style = {
        padding: '5%',
        fontSize:`${referenceSize}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return(
        <div 
            id="loading" style={style}>
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