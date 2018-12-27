import React, { Component } from 'react';
import classNames from 'classnames';

class Day extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const className = classNames('day', { selectable: this.props.selectable });

    return (
      <span className={className}>{this.props.value}</span>
    )
  }
}

export default Day;
