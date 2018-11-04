import React, { Component } from 'react'
import {StaticQuery, graphql} from 'gatsby'
import {Link} from 'gatsby'
import './css/layout.css'
import { Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';

function Results(props) {
  
}


  function renderResults ({result}) {
    const entryResult = result.map((eachResult) => {
      return (
        <div>
          <div> {this.state.weighted} <div/>
          <div> {this.state.Author} <div/>
          <div> {this.state.Work} <div/>
        </div>)
    });
    return entryResult;
  }
}

export default returnResult;
