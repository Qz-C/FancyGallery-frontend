import React, { useState } from "react";

import "./styles.css";

import '../../global.css';

import {FiEdit2} from "react-icons/fi"

import {FiTrash2} from "react-icons/fi"

import {FiDownload} from "react-icons/fi"

import {FiCheck} from "react-icons/fi"

import { Link } from "react-router-dom";

import api from "../../services/api"

import Modal from "../../components/Modal"

import filesize from "filesize"

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
            } ,
            //This option says that the response instead of a JSON, as default, will be a file.
            responseType : "blob"     
        }).then(response => {
                    console.log(response);
                    //It creates a reference to blob object in order to uses it in the DOM 
                    const imgurl = window.URL.createObjectURL(response.data);
                    //It creates a link element
                    const img = document.createElement('a');
                    //It attaches the blob object's reference into link
                    img.href = imgurl;
                    //It specifies that the image must be download with the provided name
                    img.download = props.image.name;
                    //It clicks on element in order to start the download process
					img.click();
            })
    }

    const handleDeleteImg = (picture) => {
        api({
            method: "delete",
            url: `/img/delete?id=${picture.id}`,
            headers: {
                Authorization : `Bearer ${props.token}`
            }
        }).then(() => {
            props.onClose();
            props.deleteSingle(props.image.id);
        }).catch( error => {
            console.log(error.status);
        })
    }


    return(
        <Modal onClose={props.onClose}>
            <section className="img-content">
                    <img src={props.image.url} alt={props.image.name}/>
                    <div className="menu">
                            <div id="picture-name-content">
                                
                                { isEditing ? null : <>
                                    <h3 id="picture-name" contentEditable={false} onBlur={ event => {setNewName(event.target.value)}}>
                                        { newName !== "" ? newName : (props.image.name).split('.')[0] }
                                    </h3>
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
                            <h3>
                                { filesize(props.image.size) } 
                            </h3>
                            <h3>
                                { (props.image.created_at).split('T')[0] }
                            </h3>
                            <h3>
                                { (props.image.format).toUpperCase() }
                            </h3>
                </div>
                <div className="icons-img">
                                <Link className="img-button" to="#" >
                                    <FiDownload color={"FFFFFF"} size={22} onClick={handleDownlodImg} />
                                </Link>
                                <Link className="img-button" to="#" >
                                    <FiTrash2 color={"#FFFFFF"} size={22} onClick={ () => handleDeleteImg(props.image)}/>
                                </Link>
                </div>   
            </section>
        </Modal>
            
    )
}

export default Image;