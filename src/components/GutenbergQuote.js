import React from 'react';
import ConceptNet from '../apis/ConceptNet';
import Gutenberg from '../apis/Gutenberg';

import './css/results.css'

class GutenbergQuote extends React.Component  {
  constructor(props) {
    super(props);
    this.state = { text: "Loading" };
  }
  
  
  componentDidMount() {
    Promise.all(this.props.tags.map((tag) => {
      return ConceptNet.associations(tag);
    })).then(async (tagsets) => {
      let associatedWords = [];
      tagsets.forEach((tagset) => {
        (tagset || []).forEach((tag) => {
          if (associatedWords.indexOf(tag) <= 0) {
            associatedWords.push(tag);
          }
        });
      });

      let paragraph = await Gutenberg.getParagraph(associatedWords);

      this.setState({
        text: (paragraph || {})["text"]
      });
    });
  }

  render() {
    return (
      <p className="results__text">
        {this.state.text}
      </p>
    );
  }
}

export default GutenbergQuote;
