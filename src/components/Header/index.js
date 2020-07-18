import React from "react";

import './styles.css';

import { FaCamera } from "react-icons/fa";

import { FaFacebookSquare } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa";

import { FaTwitter } from "react-icons/fa";


const Header = () => (
        <header>
            <div className="logo">
                <FaCamera size={22}/>
                <h1> FancyGallery </h1>
            </div>
                <div className="social-media">
                    <FaFacebookSquare size={22}/>
                    <FaInstagram size={22}/>
                    <FaTwitter size={22}/>
                </div>
        </header>
)

export default Header;