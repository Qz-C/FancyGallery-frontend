import React, {useState, useEffect}  from "react";

import "./styles.css"

import "../../global.css"

import Modal from "../../components/Modal";

const Upload = props => {

    const [files, setFiles] = useState([]);

    const handleDrop = event => {
        event.preventDefault();
        console.log(event.dataTransfer.files[0]);
           
    }

    const handleDragOver = event => {
        event.preventDefault();

    }

    const handleFiles = event => {
        setFiles(files.push[event.dataTransfer.files[0]]);
    }

    useEffect(() => {
        console.log(files);
    }, [files])

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
                            onChange={handleFiles}/>
                    <label class="button" for="file-input">Upload</label>
                    <p className="supported"> supported: .gif .jpeg .png </p>
                </form>
            </div>
        </Modal>
    )
}

export default Upload;