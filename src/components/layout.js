import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'
import {Link} from 'gatsby'
import Header from './header'
import ImageUpload from './ImageUpload'
import Footer from './footer'
import './css/layout.css'
import { Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Layout = ({children}) => (<StaticQuery query={graphql `
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `} render={data => (<> < Helmet title = {
    data.site.siteMetadata.title
  }
  meta = {
    [
      {
        name: 'description',
        content: 'Sample'
      }, {
        name: 'keywords',
        content: 'sample, something'
      }
    ]
  } > <html lang="en"/>
</Helmet>
<Header TitleStuff="1000 Words"/>
<div>
  {children}
</div>
<Footer/>
</>)}/>)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
