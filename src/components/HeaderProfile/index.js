import React, {useState} from "react";

import './styles.css';

import { FaCamera } from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";

import { Link } from "react-router-dom"

import Upload from "../../pages/Upload"

import cookie from "../../services/cookies"

const HeaderProfile = props => {

        const [token, setToken] = useState(cookie.getCookie("token"));
        const [showUpload, setShowUpload] = useState(false);

        return(
            <header className="header-profile">
                <div className="logo">
                    <FaCamera size={22}/>
                    <h1> FancyGallery </h1>
                </div>
                <div className="user-nav">
                    <div className="user-name"> 
                        <h1> Hello, </h1>  
                        <Link className="link-name" to="#"> {props.name} </Link>
                    </div>
                    <Link to="#">
                        <button className="link-button"
                                onClick={() => {setShowUpload(true)}}> 
                                Upload 
                        </button>
                    </Link>
                    <Link className="sign-out" to="#">  
                        <FiLogOut size={30}/>
                    </Link>
                    { showUpload ? <Upload 
                                    onClose={() => setShowUpload(false)}
                                    token ={token} 
                                    /> : false
                    }
                    
                </div>
            </header>
        )
       
}

export default HeaderProfile;