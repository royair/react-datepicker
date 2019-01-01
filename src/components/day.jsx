import React, { Component } from 'react';
import classNames from 'classnames';

class Day extends Component {
  render() {
    const { day, onClickDay } = this.props;
    const className           = classNames('day', { selectable: day.selectable });

    return (
      <span className={className} onClick={() => onClickDay(day)}>{day.value}</span>
    )
  }
}

// set default props
Day.defaultProps = {
  day: {}
};

export default Day;
