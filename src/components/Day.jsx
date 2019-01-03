import React, { Component } from 'react';
import classNames from 'classnames';

class Day extends Component {
  render() {
    const { day, onClickDay, selectedDay } = this.props;
    const className                        = classNames('day', {
      selectable: day.selectable,
      selected: day === selectedDay
    });

    return (
      <span className={className}
            onClick={() => onClickDay(day)}>{day.value}</span>
    )
  }
}

// set default props
Day.defaultProps = {
  day: {}
};

export default Day;
