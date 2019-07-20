import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class Lands extends Component {
  render() {
    return (
      <div className="moldura">

        <h1>Landscape Page</h1>
        <Card className="homePage twothirds">
          <div className="ipsumText">
            <p>Random text over here.</p>
            <p>Random text over here.</p>
            <p>Random text over here.</p>
            <p>Random text over here.</p>
          </div>
        </Card>
    </div>
    )
  }
}
