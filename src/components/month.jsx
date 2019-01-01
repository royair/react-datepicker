import React, { Component } from 'react';
import Week from "./week";

class Month extends Component {
  render() {
    const { month, onClickDay } = this.props;
    const weeks                 = month.weeks.map((week) => <Week
      key={week.id}
      week={week}
      onClickDay={onClickDay}></Week>);

    return (
      <div className={'month'}>{weeks}</div>
    )
  }
}

// set default props
Month.defaultProps = {
  month: {
    weeks: []
  }
};

export default Month;
