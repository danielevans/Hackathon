import React from 'react';
import './css/imageUpload.css';

const ImageTag = (props)=>{
    let selected = props.selectedTags;
    
    let index = selected.indexOf(props.tagName);
    

    let selectedDisplay = (index>-1) ?
    <div className="image__tag image__tag--selected" onClick={()=>props.selectTag(props.tagName)}>
            {props.tagName}
    </div>: null

    let unselectedDisplay = (index<0) ?
    <div className="image__tag" onClick={()=>props.selectTag(props.tagName)}>
            {props.tagName}
    </div>: null

    return(
        <div>
            {selectedDisplay}{unselectedDisplay}
        </div>
    );
}


export default ImageTag;