import React, { Component } from 'react';
import classNames from 'classnames';

class Week extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const className = classNames('week');

    return (
      <div className={className}>{this.props.children}</div>
    )
  }
}

export default Week;
