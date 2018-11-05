import React from 'react'
//import './css/layout.css'
import { Card, CardTitle, CardText, CardBody } from 'reactstrap'
import {PASSAGES} from './utils/testdata'


class ReturnResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passages: PASSAGES
    };
  }

  render() {
    const thedata=(this.state.passages);
    console.log(thedata);
    let item = (dataItem) => {
      return (
        <span key={dataItem.id}>{dataItem.Title}</span>
      );
    };
    return (
      <div>
        <Card>
          {thedata.map(item)[2]}
        </Card>

      </div>
    )
  }
}
export default ReturnResult;
