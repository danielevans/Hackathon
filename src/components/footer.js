import React from 'react'
import { Link } from 'gatsby'
import './css/footer.css'
import { Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Footer = () => (
  <div className="footer">
    <div className="footerContent">
      <p>
        <a href="https://github.com/danielevans/Hackathon">
          <img src="https://i.imgur.com/C2P70Cu.png" alt="Github Logo" id="github-logo"></img>
        </a>
      </p>
      <p>
        © 2018, PDX Hackathon Group with Peter, Daniel1, DanielA, Aaron, and Tony!
      </p>
    </div>
  </div>
)

export default Footer
