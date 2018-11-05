import React from 'react'
import { Link } from 'gatsby'
import './css/header.css'

export default props => (
  <div className="header">
    <div className="headerContent">
      <h1>
        <Link to="/">{props.TitleStuff}</Link>
      </h1>
      <h2>An image search for written media</h2>
    </div>
  </div>
)
