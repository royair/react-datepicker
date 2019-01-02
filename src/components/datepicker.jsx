import React, { Component } from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

import Month from '../components/month';
import Legend from '../components/legend';
import { IconNext, IconPrevious, IconClose } from '../components/icons';

import './datepicker.scss';

class Datepicker extends Component {
  constructor(props) {
    super(props);

    this.calendar         = this.props.store.calendar;
    this.monthsListElem   = undefined;
    this.hoveredMonthElem = undefined;
    this.state            = {
      selectedMonth: undefined,
      hoveredMonth: undefined,
      isOpen: false,
    };
  }

  componentDidMount() {

    // add arrow key listeners to menu
    document.addEventListener('keydown', (e) => {

      // abort if list is closed
      if (!this.state.isOpen) return;
      let newHoveredMonth;

      switch (e.key) {
        case 'ArrowDown':
          // if no hovered month set it to the first month
          newHoveredMonth = this.calendar.hoveredMonth
            ? this.calendar.hoveredMonth.next
            : this.calendar.months[0];

          // abort if at the end of list
          if (!newHoveredMonth) return;

          this.setState(() => ({ hoveredMonth: newHoveredMonth }), () => {
            this.hoveredMonthElem && this.hoveredMonthElem.scrollIntoView();
          });
          break;

        case 'ArrowUp':
          // if no hovered month set it to the first month
          newHoveredMonth = this.calendar.hoveredMonth
            ? this.getPrevMonth(this.calendar.hoveredMonth)
            : this.calendar.months[0];

          // abort if at the end of list
          if (!newHoveredMonth) return;

          this.setState(() => ({ hoveredMonth: newHoveredMonth }), () => {
            this.hoveredMonthElem.scrollIntoView();
          });
          break;

        case 'Escape':
          this.closeList();
          break;

        case 'Enter':

          break;

        default:
      }

    });
  }

  getSelectedMonth = () => {
    return this.props.store.calendar.selectedMonth;
  };

  handleClickNext = () => {
    // abort if not next month
    if (!this.props.store.calendar.selectedMonth.next) return;

    this.props.store.calendar.selectedMonth = this.props.store.calendar.selectedMonth.next;
  };

  handleClickPrev = () => {
    // abort if not next month
    if (!this.props.store.calendar.selectedMonth.prev) return;

    this.props.store.calendar.selectedMonth = this.props.store.calendar.selectedMonth.prev;
  };

  handleToggleShowList = () => {
    this.state.isOpen ? this.closeList() : this.openList();
  };

  handleMonthSelection = (selectedMonth) => {
    this.calendar.selectedMonth = selectedMonth;
    this.closeList();
  };

  handleDaySelection = (selectedDay) => {
    // abort if not selectable
    if (!selectedDay.selectable) return;

    this.setState(() => ({ selectedDay }));
    console.log(selectedDay);
  };

  handleMonthHovered = (hoveredMonth) => {
    this.setState(() => ({ hoveredMonth }));
  };

  onClickOutside = (e) => {
    if (!this.monthsListElem.contains(e.target)) this.closeList();
  };

  getMonthList = () => {
    return this.calendar.months.map((month) => (
      <li key={month.id}
          className={classNames({ hovered: month.hovered })}
          ref={(el) => {
            if (month === this.calendar.hoveredMonth) this.hoveredMonthElem = el;
          }}
          onClick={() => this.handleMonthSelection(month)}
          onMouseOver={() => this.handleMonthHovered(month)}>
        {month.name}
      </li>));
  };

  openList = () => {
    this.setState(() => ({ isOpen: true }));
    document.addEventListener('click', this.onClickOutside);
  };

  closeList = () => {
    this.calendar.isOpen        = false;
    this.calendar.hoveredMonth = undefined;

    this.setState(() => ({ isOpen: false, hoveredMonth: undefined }));
    document.removeEventListener('click', this.onClickOutside);
  };

  render() {
    return (
      <div className='calendar'>

        <IconClose className={'icon-close'}/>

        <div className="title">תאריך יציאה</div>

        <div className="month-picker">
          <IconNext className={'icon-next'}
                    onClick={this.handleClickNext}
                    disabled={!this.calendar.selectedMonth.next}/>

          <div className={classNames('months', { opened: this.state.isOpen })}
               ref={(element) => this.monthsListElem = element}>
            <div
              className="selected"
              onClick={this.handleToggleShowList}>{this.getSelectedMonth() && this.getSelectedMonth().name}</div>
            <ul>
              {this.getMonthList()}
            </ul>
          </div>

          <IconPrevious className={'icon-previous'}
                        onClick={this.handleClickPrev}
                        disabled={!this.calendar.selectedMonth.prev}/>
        </div>

        <div className="days-of-week">
          <div className="day">ש'</div>
          <div className="day">ו'</div>
          <div className="day">ה'</div>
          <div className="day">ד'</div>
          <div className="day">ג'</div>
          <div className="day">ב'</div>
          <div className="day">א'</div>
        </div>

        <Month month={this.getSelectedMonth()}
               selectedDay={this.state.selectedDay}
               onClickDay={this.handleDaySelection}></Month>

        <Legend/>

      </div>
    )
  }
}

export default inject('store')(observer(Datepicker));
