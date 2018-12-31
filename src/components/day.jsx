import React, { Component } from 'react';
import classNames from 'classnames';

class Day extends Component {
  render() {
    const className = classNames('day', { selectable: this.props.day.selectable });

    return (
      <span className={className}>{this.props.day.value}</span>
    )
  }
}

// set default props
Day.defaultProps = {
  day: {}
};

export default Day;
