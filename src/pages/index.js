import React from 'react'
import Layout from '../components/layout'
import ImageUpload from '../components/ImageUpload'
import ReturnResult from '../components/ReturnResult'

class IndexPage extends React.Component{
  state = {
    tags: [],
  }

  render() {

    return (
      <Layout>
        
        <ImageUpload />
        <ReturnResult />
      </Layout>
    );
  }
}

export default IndexPage;
