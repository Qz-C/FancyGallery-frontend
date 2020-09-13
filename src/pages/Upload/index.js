import React, {useState, useEffect} from "react";

import "./styles.css"

import "../../global.css"

import Modal from "../../components/Modal";

import api from "../../services/api"

import { CircularProgressbar } from "react-circular-progressbar"

import {FiCheck} from "react-icons/fi"

import filesize from "filesize"


const Upload = props => {

    const [fileList, setFileList] = useState([]);

    //Handle the files droped
    const handleDrop = event => {
        event.preventDefault();
        const files = [...event.dataTransfer.files];
        handleFiles(files);
    }

    //Handle the files from input file
    const handleFilesOnInput = event => {
        const files = [...event.target.files];
        handleFiles(files);
    }

    const handleFiles = files => {
        const formated = files.map(file => (
            {
                file: file,
                name: file.name,
                readableSize: filesize(file.size),
                preview: URL.createObjectURL(file),
                uploaded: false,
                progress: 0,
                error: false,
            }))
        setFileList([...fileList, ...formated])
    }

    //Hanlde the files passing over 
    const handleDragOver = event => {
        event.preventDefault();
    }
    const uploadFile = files => {
        files.forEach( file =>{

            const Data = new FormData();
            Data.append('file', file.file);
            api({
                method:"post",
                url: "/img/upload",
                headers: {
                    Authorization : `Bearer ${props.token}`
                },
                data: Data,
                onUploadProgress: ProgressEvent => {
                    
                }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
         })      
    }

    return(
        <Modal onClose={props.onClose}>
            <div className="drop-zone" 
                 onDrop={handleDrop} 
                 onDragOver={handleDragOver}>
                <form id="upload-form">
                    <p> Drop the images here </p>
                    <input  type="file" 
                            id="file-input" 
                            multiple={true} 
                            accept="image/jpeg image/gif image/png"
                            onChange={handleFilesOnInput}/>
                    <div className="dialog-upload">
                        {fileList.map(file =>(
                            <li>
                                <img src={file.preview} alt={file.name}/>
                                <div className="text">
                                    <strong>
                                        {file.name}
                                    </strong>
                                    <p>{file.readableSize}</p>
                               </div>
                                { !file.uploaded ? <CircularProgressbar value={file.progress} text={`${file.progress}%`}/> : <FiCheck size={ 22 } color = {"green"}/>}
                            </li>
                        ))}
                    </div>
                    <label class="button" for="file-input">Upload</label>
                    <p className="supported"> supported: .gif .jpeg .png </p>
                </form>
            </div>
        </Modal>
    )
}

export default Upload;


//24-98809-3948