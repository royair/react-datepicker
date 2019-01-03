import React, { Component } from 'react';
import classNames from "classnames";
import { observer } from "mobx-react";

class MonthList extends Component {
  render() {
    const { months, onClick, onMouseOver, setRef } = this.props;
    const list                                     = months.map((month) => (
      <li key={month.id}
          className={classNames({ hovered: month.hovered })}
          ref={(el) => {
            if (month.hovered) {
              setRef(el)
            }
          }}
          onClick={() => onClick(month)}
          onMouseOver={() => onMouseOver(month)}>
        {month.name}
      </li>));

    return (
      <ul>
        {list}
      </ul>
    )
  }
}

// set default props
MonthList.defaultProps = {
  month: {
    weeks: []
  }
};

export default observer(MonthList);
