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
            uploadDisplay: true
        }
    }
    
  
    
    
    bindInput = (input) => {
        this.setState({urlInput: input})
    }
    selectURL = () => {
        let imageURL = this.state.urlInput.toString();
        
        this.setState({url: imageURL, imageName: imageURL, selectedTags: []})
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
            this.setState({tags: imageTags, uploadDisplay: false})
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
                console.log('file', file);
              
              this.setState({tags: imageTags, url: file.base64, imageName: file.name, uploadDisplay: false, selectedTags: []})
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
        console.log(selected);
        if(selected.indexOf(tagName)<0){
            console.log('push tag', tagName);
            selected.push(tagName);
            this.setState({selectedTags: selected});
        } else{
            let index = selected.indexOf(tagName)
            console.log('splice tag', index);
            selected.splice(index, 1);
            this.setState({selectedTags: selected});
        }
    }

    render() {
        let uploader = (this.state.uploadDisplay === true) ?
        <div>
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
            <button onClick={()=>this.displayUpload()}>Upload new photo</button> 
        </div>: null

        let refineSearch = (this.state.selectedTags.length > 4) ?
        <button className="upload__search">Search selected tags</button> : null


        return(
            <div>
                {uploader}{changeUpload}
                <div className="image__display">

                    <div className="image__div">
                        <img className="image" src={this.state.url}/>
                    </div>

                    <div className="image__tags">
                        {this.state.tags.map((tag)=><ImageTag

                            key={tag} 
                            selectTag = {this.selectTagHandler}

                            tagName = {tag}
                            selectedTags = {this.state.selectedTags}
                        />)}
                       <div className="image_refine">{refineSearch}</div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ImageUpload;
