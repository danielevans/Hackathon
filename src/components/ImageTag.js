import React from 'react';
import './css/imageUpload.css';

const ImageTag = (props)=>{
    return(
        <div className="image__tag">
            {props.tagName}
        </div>
    );
}


export default ImageTag;