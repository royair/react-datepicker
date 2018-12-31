import React, { Component } from 'react';
import classNames from 'classnames';
import Week from "./week";

class Month extends Component {
  render() {
    const className = classNames('month');
    const weeks     = this.props.month.weeks.map((week) => <Week key={week.id}
                                                                 week={week}></Week>);

    return (
      <div className={className}>{weeks}</div>
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
