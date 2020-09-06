import React from "react";

import "./styles.css"

import "../../global.css"

import Modal from "../../components/Modal";

const Upload = props => {

    const handleDrop = event => {
        event.preventDefault();
        
    }

    const handleDragOver = event => {
        event.preventDefault();
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
                            accept="image/jpeg image/gif image/png"/>
                    <label class="button" for="file-input">Upload</label>
                    <p className="supported"> supported: .gif .jpeg .png </p>
                </form>
            </div>
        </Modal>
    )
}

export default Upload;