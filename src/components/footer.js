import React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
  <div
    style={{
      background: 'rgb(13, 136, 237)',
      marginBottom: '0rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          This is a site thing.
        </Link>
      </h1>
    </div>
  </div>
)

export default Footer
