import React from "react";

import "./styles.css"

import "../../global.css"

import Modal from "../../components/Modal";

const Upload = props => {

    const handleDrop = event => {
        console.log(event);
    }

    return(
        <Modal onClose={props.onClose}>
            <div className="drop-zone" onDrop={handleDrop}>
                <form id="upload-form">
                    <p>Upload box</p>
                    <input  type="file" id="file-input"/>
                    <label class="button" for="file-input">formats supported .jpeg .png .gif</label>
                    <input type="submit" id="submit-input"/>
                </form>
            </div>
        </Modal>
    )
}

export default Upload;