import React, { Component } from 'react';
import classNames from 'classnames';
import Day from "./day";

class Week extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const className = classNames('week');
    const days      = this.props.week && this.props.week.days.map((day) => <Day
      key={day.id} day={day}></Day>)

    return (
      <div className={className}>{days}</div>
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
