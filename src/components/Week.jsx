import React, { Component } from 'react';
import Day from "./Day";
import { observer } from "mobx-react";

class Week extends Component {
  render() {
    const { week, onClickDay, ...restProps } = this.props;
    const days                               = week && week.days.map((day) =>
      <Day
        key={day.id}
        day={day}
        onClickDay={onClickDay}
        {...restProps}></Day>);

    // reverse days to match rtl layouts
    days.reverse();

    return (
      <div className={'week'}>{days}</div>
    )
  }
}

// set default props
Week.defaultProps = {
  week: {
    days: []
  }
};

export default observer(Week);
