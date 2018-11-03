import React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
  <div
    style={{
      background: '#333333',
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
        </Link>
      </h1>
    </div>
  </div>
)

export default Footer
