import React, { useState } from "react";

import "./styles.css";

import '../../global.css';

import {FiEdit2} from "react-icons/fi"

import {FiTrash2} from "react-icons/fi"

import {FiDownload} from "react-icons/fi"

import {FiX} from "react-icons/fi"

import {FiCheck} from "react-icons/fi"

import { Link } from "react-router-dom";

import api from "../../services/api"


const Image = props => {

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");


    const handleEnableEditing = () => {
        setIsEditing(true);
        const textElement = document.getElementById("picture-name");
        const divElement = document.getElementById("picture-name-content");
        
        textElement.contentEditable = true;
        
        divElement.style.backgroundColor = "#181818"
        divElement.style.padding = "5px"
        divElement.style.borderRadius = "10px"
        divElement.style.border = "solid 1px #9C27B0"
    }

    const hasSpace = str => {
        return (/ /.test(str));
    }

    const handleSaveNewName = () => {

        console.log(` Na Imagem: Bearer ${props.token}`)

        const divElement = document.getElementById("picture-name-content");
        
        if(newName !== "" && !hasSpace(newName)){
            api({
                method: "put",
                url: `/img/updatename?id=${props.image.id}`,
                headers: {
                    Authorization : `Bearer ${props.token}`
                },
                data: {
                    name: newName
                }               
            }).then(response => {
                props.image.name = newName;
            })
        }

        divElement.style.backgroundColor = "transparent"
        divElement.style.padding = "0"
        divElement.style.borderRadius = "0"
        divElement.style.border = "none"
        setIsEditing(false);
    }

    const handleDownlodImg = () => {
        api({
            method: "get",
            url: `/img/download?id=${props.image.id}`,
            headers: {
                Authorization : `Bearer ${props.token}`
            }         
        }).then(response => {
            console.log(response.data);
        })
    }


    return(
      <div className="modal-container">
            <div className="modal">
                <Link to="#" className="close-button" onClick={props.onClose}>
                    <FiX  onClick={props.onClose} size={22} color={'white'}/> 
                </Link>
                <section>
                    <img src={props.image.url} alt={props.image.name}/>
                    <div className="menu">
                            <div id="picture-name-content">
                                
                                { isEditing ? null : <>
                                    <h1 id="picture-name" contentEditable={false} onBlur={ event => {setNewName(event.target.value)}}>
                                        { newName !== "" ? newName : (props.image.name).split('.')[0] }
                                    </h1>
                                    <Link to="#" onClick={ handleEnableEditing }>
                                        <FiEdit2 size={16}/>
                                    </Link>
                                </>}

                                { isEditing ? <>
                                    <input type="text" id="picture-name-editable"
                                           onClick = { event => {event.preventDefault()}}
                                           onChange={ event => {setNewName(event.target.value)}}
                                           placeholder="New name"
                                           autoComplete="off"
                                    />
                                    <Link to="#" onClick={ handleSaveNewName }>
                                        <FiCheck size={16}/>
                                    </Link>
                                </> : null }

                            </div>
                            <h1>
                                { (props.image.size/1024/1024).toFixed(2) } MB
                            </h1>
                            <h1>
                                { (props.image.created_at).split('T')[0] }
                            </h1>
                            <h1>
                                { (props.image.format).toUpperCase() }
                            </h1>
                            <Link to="#" >
                                <FiTrash2 color={"#FFFFFF"} size={22} />
                            </Link>
                            <Link to="#"  >
                                <FiDownload color={"FFFFFF"} size={22} onClick={handleDownlodImg} />
                            </Link>
                            
                            
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Image;