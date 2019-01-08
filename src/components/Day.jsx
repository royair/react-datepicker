import React, { Component } from 'react';
import classNames from 'classnames';
import { observer } from "mobx-react";

class Day extends Component {
  render() {
    const { day, onClickDay, onMouseOverDay, onMouseOutDay } = this.props;
    const className                                          = classNames('day', {
      selectable: day.selectable,
      selected: day.selected,
      'start-day': day.startDay,
      'end-day': day.endDay,
      'hovered': day.hovered,
      'end-hovered-day': day.endHoveredDay,
    });

    return (
      <span className={className}
            onClick={() => onClickDay(day)}
            onMouseOver={() => onMouseOverDay(day)}
            onMouseOut={() => onMouseOutDay(day)}>{day.value}</span>
    )
  }
}

// set default props
Day.defaultProps = {
  day: {}
};

export default observer(Day);
