import React from 'react'

import Layout from '../components/layout'

import ImageUpload from '../components/ImageUpload';
import returnResult from '../components/returnResult';

class IndexPage extends React.Component{
  state = {
    tags: []
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
