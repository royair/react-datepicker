import React, { Component } from 'react';
import Day from "./day";

class Week extends Component {
  render() {
    const { week, onClickDay} = this.props;
    const days      = week && week.days.map((day) => <Day
      key={day.id}
      day={day}
      onClickDay={onClickDay}></Day>)

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

export default Week;
