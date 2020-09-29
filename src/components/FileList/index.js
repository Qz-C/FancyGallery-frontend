import React from "react";
import "./styles.css";
import {FiCheck} from "react-icons/fi";
import {CircularProgressbar} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

const FileList = props => {

    const {files} = props;

    return(
        <div className="dialog-upload">
            {console.log("Rendering" + props.files[0])}
            {files.map(file =>(
                <li key={file.id}>
                    <img src={file.preview} alt={file.name}/>
                    <div className="text">
                            <strong>
                                {file.name}
                            </strong>
                            <p>{file.readableSize}</p>
                    </div>
                    { file.uploaded ? 
                        <FiCheck 
                            size={ 22 } 
                            color = {"green"}
                        /> : 
                        <CircularProgressbar 
                            styles={{
                                root: {width: 24},
                                path: { stroke: '#9C27B0' },
                                trail: {stroke: '#666'}
                            }}
                            strokeWidth={12}
                            value={file.progress}
                        />
                    }
                </li>
            ))}
        </div>
    )
}

export default FileList;