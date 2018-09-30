import React, { Component } from 'react';
import '../App.css';
import calcTotalNetWorth from '../util/calcUtil'

class TotalNetWorth extends Component {
  render() {
    return (
      <span className="net-worth-total">{calcTotalNetWorth(this.props.accounts)}</span>
    );
  }
}

export default TotalNetWorth;
