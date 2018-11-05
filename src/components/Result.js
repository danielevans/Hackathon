import React from 'react';

import './css/results.css';


class Result extends React.Component{
    state = {
        showOneResult: true,
        resultFocus: '',
        showAllResults: false
    }
    
    
    
    
    
    render(){
        console.log(props.tags);
        console.log(props.selectedTags);
        return(
            <div className="result__box">
                Result
            </div>
        );
    }
}

export default Result;