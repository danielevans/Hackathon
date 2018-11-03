import React from 'react';
import './components.css';

const ImageUpload = (props) => {
    return(
        <div>
            <h2>Image Upload</h2>
            <div className="upload__options">
                <div className="upload__url">
                    <div>Enter Image URL</div>
                    <input type="text"/>
                </div>
                <div className="upload__link">
                    <div>Current image selected: </div>
                    <button>browse</button>
                </div>
            </div>
            
            
        </div>
    );
}

export default ImageUpload;