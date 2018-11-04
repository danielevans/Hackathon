import React from 'react';
// import ReactDOM from 'react-dom';
import './css/imageUpload.css';

import FileBase64 from 'react-file-base64';

import ImageTag from './ImageTag';

const Clarifai = require('clarifai');
        
const app = new Clarifai.App({
    apiKey: '7a58f90bee4743879b6108d0272685bd'
});


class ImageUpload extends React.Component {
    state = {
        tags: [],
        urlInput: "",
        url: "",
        files: []
    }
    
    
    bindInput = (input) => {
        this.setState({urlInput: input})
    }
    selectURL = () => {
        let imageURL = this.state.urlInput.toString();
        
        this.setState({url: imageURL})
        this.linkAPIHandler(imageURL);
    }
    
    //call clarifai API for image tags
    linkAPIHandler = (url) => {
        app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
        .then(generalModel => {
            return generalModel.predict({url});
        })
        .then(response => {
            var concepts = response['outputs'][0]['data']['concepts']
            console.log("concepts", concepts);
            const imageTags = concepts.map((tag)=>tag.name);
            console.log('link array', imageTags);
            this.setState({tags: imageTags})
        })
    }

    //call clarifai API for image uploads
    getFiles(files){
        // this.setState({ files: files })
        
        console.log("FILES", files);
        // console.log("FILE DATA", files[0].base64)
        this.uploadAPIHandler(files[0]);
        
    }
   
    uploadAPIHandler = (file) => {
        
        app.models.predict(Clarifai.GENERAL_MODEL, {base64: file.base64.replace(/.*,/,'')}).then(
            (response) => {
                var concepts = response['outputs'][0]['data']['concepts']
                const imageTags = concepts.map((tag)=>tag.name);
                console.log('uploadarray', imageTags);
              
              this.setState({tags: imageTags, url: file.base64})
            }
            // ,
            // function(err) {
            //   // there was an error
            // }
          );
    }
    
    

    render() {
        return(
            <div>
                <div className="upload__options">
                    <div className="upload__url">
                        <div>Enter Image URL</div>
                        <input type="text" onChange={(e)=>this.bindInput(e.target.value)}/>
                        <button onClick={()=>this.selectURL()}>Select URL</button>
                    </div>
                    <div className="upload__link">
                        
                        <FileBase64
                            multiple={ true }
                            onDone={ this.getFiles.bind(this) } />

                    </div>
                </div>
                <div className="image__display">

                    <div className="image__div">
                    <img className="image" src={this.state.url}/>
                    </div>
                    
                    <div className="image__tags">
                        {this.state.tags.map((tag)=><ImageTag 
                            tagName = {tag}
                        />)}
                    </div>
                    

                    <img alt="" src={this.state.url}></img>

                    <h2>tags</h2>
                    <ul>
                    {this.state.tags.map((tag)=><li>{tag}</li>)}
                    </ul>

                </div>
            </div>
        );
    }
}

export default ImageUpload;