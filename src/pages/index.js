import React from 'react'
import Layout from '../components/layout'
import ImageUpload from '../components/ImageUpload'


class IndexPage extends React.Component{
  state = {
    tags: [],
  }

  render() {

    return (
      <Layout>
        
        <ImageUpload />
       
      </Layout>
    );
  }
}

export default IndexPage;
