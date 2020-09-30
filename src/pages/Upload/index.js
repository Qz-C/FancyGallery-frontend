import React, {useState} from "react";
import "./styles.css"
import "../../global.css"
import Modal from "../../components/Modal";
import api from "../../services/api"
import filesize from "filesize"
import FileList from "../../components/FileList"
import {uniqueId} from "lodash"

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
                id: uniqueId(),
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

    const updateFileList = (status) => {
        const files = fileList.map(file => {

            const {id, progress, uploaded, error} = status;
            
            if(file.id === id){
               file.uploaded = uploaded;
               file.error = error;
               file.progress = progress;
               return file;
            }else
                return file;
        });
        setFileList(files);
    }

    const uploadFile = event => {
        event.preventDefault();
        fileList.forEach( (file) => {

            let progress = 0;

            if(!file.uploaded)
            {
                const Data = new FormData();
                Data.append('file', file.file);
                api({
                    method:"post",
                    url: "/img/upload",
                    headers: {
                        Authorization : `Bearer ${props.token}`
                    },
                    data: Data,
                    onUploadProgress: event => {
                        progress = parseInt(Math.round( (event.loaded*100) / event.total));

                        updateFileList({
                            id: file.id,
                            progress: progress,
                            uploaded: false,
                            error: false
                        });
                        console.log(progress);
                    }
                })
                .then(response => {
                    updateFileList({
                        id: file.id,
                        progress: progress,
                        uploaded: true,
                        error: false
                    });
            
                })
                .catch(error => {
                    updateFileList({
                        id: file.id,
                        progress: progress,
                        uploaded: true,
                        error: false
                    });
                })
            }
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
                    <FileList files={fileList}/>
                    <input id="upload-button" type="submit" disabled={true} className="button" value="Upload"/>
                </form>
            </div>
        </Modal>
    )
}

export default Upload;