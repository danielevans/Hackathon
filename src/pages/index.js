import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = () => (
  <Layout>
    <h1>Hello There Darlings !  </h1>
    <p>Welcome to our new Gatsby site. Please, look around! Explore, and enjoy! </p>
    <p>We're here to build something great.</p>
    <img src="https://source.unsplash.com/random/400x200" alt="random image testing usability" />
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <p><Link to="/contact/">Contact</Link></p>
    <p><Link to="/about/">About</Link></p>
    <div style={{ margin: `3rem auto`, maxWidth: 600 }}>
      <h1>Richard Hamming on Luck</h1>
      <div>
        <p>
          From Richard Hamming’s classic and must-read talk, “
          <a href="http://www.cs.virginia.edu/~robins/YouAndYourResearch.html">
            You and Your Research
          </a>
          ”.
        </p>
        <blockquote>
          <p>
            There is indeed an element of luck, and no, there isn’t. The prepared
            mind sooner or later finds something important and does it. So yes, it
            is luck.{" "}
            <em>
              The particular thing you do is luck, but that you do something is
              not.
            </em>
          </p>
        </blockquote>
      </div>
      <p>Posted April 09, 2011</p>
    </div>
  </Layout>
)

export default IndexPage
