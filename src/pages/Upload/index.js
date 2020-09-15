import React, {useState} from "react";

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
        for(let i = 0; i < files.length; i++ )
        {
            if(files[i].type !== "image/jpeg" && files[i].type !== "image/gif" && files[i].type !== "image/png")
               files.splice(i, 1);
        }
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

        const buttonElement = document.getElementById("upload-button");
        buttonElement.disabled = false;
    }

    //Hanlde the files passing over 
    const handleDragOver = event => {
        event.preventDefault();
    }

    const uploadFile = event => {
        event.preventDefault();
        fileList.forEach( file =>{
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
                    console.log(ProgressEvent);
                }
            }).then(response => {
                console.log(response);
                file.uploaded = true;
            }).catch(error => {
                console.log(error);
                file.uploaded = false;
            })
         })      
    }

    return(
        <Modal onClose={props.onClose}>
            <div className="drop-zone" 
                 onDrop={handleDrop} 
                 onDragOver={handleDragOver}>
                <form id="upload-form" onSubmit={uploadFile}>
                    <h3> Drop the images here </h3>
                    <p> or </p>
                    <input  type="file" 
                            id="file-input" 
                            multiple={true} 
                            accept="image/jpeg,image/gif,image/png"
                            onChange={handleFilesOnInput}
                    />
                    <label className="button" for="file-input">Select files</label>
                    <p className="supported"> supported: .gif .jpeg .png </p>
                    <div className="dialog-upload">
                        {fileList.map((file, index) =>(
                            <li key={index}>
                                <img src={file.preview} alt={file.name}/>
                                <div className="text">
                                    <strong>
                                        {file.name}
                                    </strong>
                                    <p>{file.readableSize}</p>
                               </div>
                                {console.log(file.uploaded)}
                                { file.uploaded ? <FiCheck size={ 22 } color = {"green"}/> : <CircularProgressbar value={file.progress} text={`${file.progress}%`}/>}
                            </li>
                        ))}
                    </div>
                    <input id="upload-button" type="submit" disabled={true} className="button" value="Upload"/>
                </form>
            </div>
        </Modal>
    )
}

export default Upload;