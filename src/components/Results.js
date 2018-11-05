import React from 'react';

import './css/results.css';
import Result from './Result';


class Results extends React.Component{
    state = {
        showOneResult: true,
        resultFocus: '',
        showAllResults: false
    }
    
    
    
    render(){
       
        
        
        return(
            <div>
                <div className="results__header">Results</div>
                <Result />
                <Result />
                <Result />
                <Result />
                <Result />
            </div>
        );
    }
}

export default Results;