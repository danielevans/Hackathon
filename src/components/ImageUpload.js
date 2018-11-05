import React from 'react';
// import ReactDOM from 'react-dom';
import './css/imageUpload.css';

import FileBase64 from 'react-file-base64';

import ImageTag from './ImageTag';

// import Results from './Results';

import GutenbergQuote from './GutenbergQuote';

const Clarifai = require('clarifai');
        
const app = new Clarifai.App({
    apiKey: '7a58f90bee4743879b6108d0272685bd'
});


class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.selectTagHandler = this.selectTagHandler.bind(this);

        this.state = {
            tags: [],
            selectedTags: [],
            urlInput: "",
            url: "",
            imageName: "",
            files: [],
            uploadDisplay: true,
            imageDisplayed: false,
            abbrevTags: []
        }
    }

    
    
    bindInput = (input) => {
        this.setState({urlInput: input})
    }
    selectURL = () => {
        let imageURL = this.state.urlInput.toString();
        
        this.setState({url: imageURL, imageName: imageURL, selectedTags: [], imageDisplayed: true})
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
          
            const imageTags = concepts.map((tag)=>tag.name);
            const abbrevTags = imageTags.slice(0,2);
            this.setState(()=>({tags: imageTags, uploadDisplay: false, abbrevTags: abbrevTags}))
            
        })
    }

    //call clarifai API for image uploads
    getFiles(files){
        
        this.setState(()=>({
            tags: [],
            selectedTags: [],
            urlInput: "",
            url: "",
            imageName: "",
            files: [],
            uploadDisplay: false,
            imageDisplayed: true,
            abbrevTags: []
        }))
       
        // console.log("FILE DATA", files[0].base64)
        this.uploadAPIHandler(files[0]);
        
    }
   
    uploadAPIHandler = (file) => {
        
        app.models.predict(Clarifai.GENERAL_MODEL, {base64: file.base64.replace(/.*,/,'')}).then(
            (response) => {
                var concepts = response['outputs'][0]['data']['concepts']
                const imageTags = concepts.map((tag)=>tag.name);
                const abbrevTags = imageTags.slice(0,2);
              
              this.setState(()=>({tags: imageTags, url: file.base64, imageName: file.name, uploadDisplay: false, selectedTags: [], imageDisplayed: true, abbrevTags: abbrevTags}))
            }
            // ,
            // function(err) {
            //   // there was an error
            // }
          );
    }
    displayUpload = () => {
        this.setState({uploadDisplay: true})
    }

    selectTagHandler = (tagName) => {
        let selected = [...this.state.selectedTags];
        
        if(selected.indexOf(tagName)<0){
            
            selected.push(tagName);
            this.setState({selectedTags: selected});
        } else{
            let index = selected.indexOf(tagName)
            
            selected.splice(index, 1);
            this.setState({selectedTags: selected});
        }
    }
    removeImageHandler = () => {
        this.setState(()=>({
            tags: [],
            selectedTags: [],
            urlInput: "",
            url: "",
            imageName: "",
            files: [],
            uploadDisplay: true,
            imageDisplayed: false,
            abbrevTags: []
        }))
    }

    render() {
        let close = (this.state.imageDisplayed === true) ?
        <div className="image__close" onClick={()=>this.removeImageHandler()}><i className="fa fa-window-close"></i></div> : null

        let imageDisplay = (this.state.imageDisplayed === true) ?
        <img className="image" src={this.state.url} alt="image"/> : null

        let tagsDisplay = (this.state.imageDisplayed === true) ?
        <div className="image__tags">
                        {this.state.tags.map((tag)=><ImageTag
                            key={tag} 
                            selectTag = {this.selectTagHandler}
                            tagName = {tag}
                            selectedTags = {this.state.selectedTags}
                        />)}
                       <div className="image_refine">{refineSearch}</div>
                    </div> :null

        let gutenbergRender =(this.state.abbrevTags.length >0) ?
        <GutenbergQuote 
                    tags = {this.state.abbrevTags}
                />:null
                            


        
        let uploader = (this.state.uploadDisplay === true) ?
        <div>
                <div className="main__header">Upload or link to an image</div>
                <div className="upload__options">
                    <div className="upload__link">
                        <FileBase64
                            multiple={ true }
                            onDone={ this.getFiles.bind(this) } />
                    </div>
                    <div className="upload__text">OR</div>
                    <div className="upload__url">
                        <input placeholder="Enter Image URL" className="upload__input" type="text" onChange={(e)=>this.bindInput(e.target.value)}/>
                        <button className="upload__button" onClick={()=>this.selectURL()}>Select URL</button>
                    </div>
                    
                </div>
                
            </div> : null

        let changeUpload = (this.state.uploadDisplay === false) ?
        <div className="upload__change">
            <div className="upload__current">Current Upload:{this.state.imageName}</div>
            <button className="upload__button" onClick={()=>this.displayUpload()}>Upload new photo</button> 
        </div>: null

        let refineSearch = (this.state.selectedTags.length > 4) ?
        <button className="upload__search">Search selected tags</button> : null


        return(
            <div>
                {uploader}{changeUpload}
                <div className="image__display">

                    <div className="image__div">
                        {imageDisplay}
                        {close}
                    </div>

                    {tagsDisplay}
                </div>
                <div className="results__header">Results</div>
                {gutenbergRender}
                
                
            </div>
        );
    }
}

export default ImageUpload;
