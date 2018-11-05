import React from 'react';
import { Progress } from 'reactstrap';
import { Button } from 'reactstrap';
import './css/loading.css';

const LoadingBar = (props) => {
  return (
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
};

export default LoadingBar;