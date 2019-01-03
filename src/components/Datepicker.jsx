import React, { Component } from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

import Month from './Month';
import Legend from './Legend';
import MonthList from './MonthList';
import DaysOfWeek from './DaysOfWeek';
import { IconNext, IconPrevious, IconClose } from './Icons';

import './Datepicker.scss';

class Datepicker extends Component {
  constructor(props) {
    super(props);

    this.calendar         = this.props.store.calendar;
    this.monthsListElem   = undefined;
    this.hoveredMonthElem = undefined;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyStrokes);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyStrokes);
  }

  handleClickNext = () => {
    // abort if not next month
    if (!this.calendar.selectedMonth.next) return;

    this.calendar.selectedMonth = this.calendar.selectedMonth.next;
  };

  handleClickPrev = () => {
    // abort if not next month
    if (!this.calendar.selectedMonth.prev) return;

    this.calendar.selectedMonth = this.calendar.selectedMonth.prev;
  };

  handleToggleShowList = () => {
    this.calendar.isOpen ? this.closeList() : this.openList();
  };

  handleMonthSelection = (selectedMonth) => {
    this.calendar.selectedMonth = selectedMonth;
    this.closeList();
  };

  handleMonthHovered = (hoveredMonth) => {
    this.calendar.hoveredMonth = hoveredMonth;
  };

  handleDaySelection = (selectedDay) => {
    // abort if day not selectable
    if (!selectedDay.selectable) return;

    this.calendar.selectedDay = selectedDay;
    console.log(selectedDay);
  };

  setHoveredMonthElem = (el) => {
    this.hoveredMonthElem = el;
  };

  handleMenuKeyStrokes = (e) => {

    // handle keystrokes for opened menu
    if (this.calendar.isOpen) {
      let newHoveredMonth;

      switch (e.key) {
        case 'ArrowDown':
          // if no hovered month set it to the first month
          newHoveredMonth = this.calendar.hoveredMonth
            ? this.calendar.hoveredMonth.next
            : this.calendar.months[0];

          // abort if at the end of list
          if (!newHoveredMonth) return;

          this.calendar.hoveredMonth = newHoveredMonth;
          this.hoveredMonthElem && this.hoveredMonthElem.scrollIntoView();
          break;

        case 'ArrowUp':
          // if no hovered month set it to the first month
          newHoveredMonth = this.calendar.hoveredMonth
            ? this.calendar.hoveredMonth.prev
            : this.calendar.months[0];

          // abort if at the end of list
          if (!newHoveredMonth) return;

          this.calendar.hoveredMonth = newHoveredMonth;
          this.hoveredMonthElem && this.hoveredMonthElem.scrollIntoView();
          break;

        case 'Escape':
          this.closeList();
          break;

        case 'Enter':
          this.calendar.selectedMonth = this.calendar.hoveredMonth;
          this.closeList();
          break;

        default:

      }
    }
  };

  handleKeyStrokes = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        this.handleClickNext();
        this.hoveredMonthElem && this.hoveredMonthElem.scrollIntoView();
        break;

      case 'ArrowRight':
        this.handleClickPrev();
        this.hoveredMonthElem && this.hoveredMonthElem.scrollIntoView();
        break;

      case 'ArrowDown':
        // no need to reopen if already opened
        if (this.calendar.isOpen) return;
        this.openList();
        break;

      default:
    }
  };

  onClickOutside = (e) => {
    if (!this.monthsListElem.contains(e.target)) this.closeList();
  };

  openList = () => {
    this.calendar.isOpen = true;

    document.addEventListener('keydown', this.handleMenuKeyStrokes);
    document.addEventListener('click', this.onClickOutside);
  };

  closeList = () => {
    this.calendar.isOpen       = false;
    this.calendar.hoveredMonth = undefined;
    this.hoveredMonthElem      = undefined;

    document.removeEventListener('keydown', this.handleMenuKeyStrokes);
    document.removeEventListener('click', this.onClickOutside);
  };

  render() {
    return (
      <div className='calendar'>

        <IconClose className={'icon-close'}/>

        <div className="title">תאריך יציאה</div>

        <div className="month-picker">
          <IconNext onClick={this.handleClickNext}
                    disabled={!this.calendar.selectedMonth.next}/>

          <div
            className={classNames('months', { opened: this.calendar.isOpen })}
            ref={(element) => this.monthsListElem = element}>

            <div className="selected"
                 onClick={this.handleToggleShowList}>
              {this.calendar.selectedMonth.name}
            </div>

            <MonthList months={this.calendar.months}
                       onClick={this.handleMonthSelection}
                       onMouseOver={this.handleMonthHovered}
                       setRef={this.setHoveredMonthElem}/>

          </div>

          <IconPrevious onClick={this.handleClickPrev}
                        disabled={!this.calendar.selectedMonth.prev}/>
        </div>

        <DaysOfWeek/>

        <Month month={this.calendar.selectedMonth}
               selectedDay={this.calendar.selectedDay}
               onClickDay={this.handleDaySelection}></Month>

        <Legend/>

      </div>
    )
  }
}

export default inject('store')(observer(Datepicker));
