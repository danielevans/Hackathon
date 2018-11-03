import React from 'react'
import { Link } from 'gatsby'

export default props => (
  <div
    style={{
      background: '#3A606E',
      marginBottom: '2rem',
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
          <h1>{props.TitleStuff}</h1>
        </Link>
      </h1>
    </div>
  </div>
)
