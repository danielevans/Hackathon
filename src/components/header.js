import React from 'react'
import { Link } from 'gatsby'
import './components.css'

export default props => (
  <div className="header">
    <div className="headerContent">
      <h1>
        <Link to="/">{props.TitleStuff}</Link>
      </h1>
    </div>
  </div>
)
