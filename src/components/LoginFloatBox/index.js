import React from "react";

import './styles.css';

import { FaFacebookSquare } from "react-icons/fa";

import { FaTwitter } from "react-icons/fa";

import { FaGoogle } from "react-icons/fa";

const LoginFloatBox = props => (
    <div className="login-float-box">
        <h3> {props.text} </h3>
        <div className="social-media">
            <FaFacebookSquare size={18}/>
            <FaTwitter size={18}/>
            <FaGoogle size={18}/>
        </div>
    </div>
)

export default LoginFloatBox;