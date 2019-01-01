import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import Month from '../components/month';
import Legend from '../components/legend';
import { IconNext, IconPrevious, IconClose } from '../components/icons';

import './datepicker.scss';

const monthNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

class Datepicker extends Component {
  constructor(props) {
    super(props);

    this.monthsListElem = undefined;
    this.state          = {
      months: [],
      selectedMonth: undefined,
      hoveredMonth: undefined,
      selectedDay: undefined,
      isOpen: false,
    };
  }

  componentDidMount() {
    for (let i = 0; i < 12; i++) {
      const firstDayOfMonth = moment().startOf('month').add(i, 'M');

      this.populateMonth(firstDayOfMonth);
    }

    // set selected month to the first one in the array
    this.setState((state) => ({ selectedMonth: state.months[0] }));
  }

  populateMonth = (firstDayOfMonth) => {
    const today            = moment();
    const startOfMonth     = firstDayOfMonth;
    const endOfMonth       = moment(firstDayOfMonth).endOf('month');
    const endOfWeekMonth   = moment(firstDayOfMonth).endOf('month').day('saturday');
    const startOfWeekMonth = moment(firstDayOfMonth).startOf('month').day('sunday');
    const current          = moment(startOfWeekMonth);

    let month = {
      id: null,
      selected: today.isSame(startOfMonth, 'month') ? true : false,
      year: null,
      value: null,
      name: function () {
        return `${this.year} ${monthNames[this.value]}`
      },
      weeks: []
    };

    let week = {
      id: null,
      days: []
    };

    while (current.isSameOrBefore(endOfWeekMonth, 'day')) {

      let day = null;

      switch (true) {

        //set days until start of month, OR days from end of month to end of week of month
        case (current.isBetween(startOfWeekMonth, startOfMonth, 'day', '[)')):
        case (current.isBetween(endOfMonth, endOfWeekMonth, 'day', '(]')):
          day = {
            id: current.format('x'),
            value: undefined,
            date: moment(current),
            selectable: false
          };
          break;

        //set days from start of month to end of month
        case (current.isBetween(startOfMonth, endOfMonth, 'day', '[]')):
          day = {
            id: current.format('x'),
            value: current.format('D'),
            date: moment(current),
            selectable: current.isSameOrAfter(today, 'day')
          };
          break;
        default:

      }

      week.days.push(day);

      if (week.days.length === 7) {
        week.days.reverse();
        week.id = month.weeks.length;
        month.weeks.push(week);
        week = {
          id: null,
          days: []
        };
      }

      current.add(1, 'd');
    }

    month.year  = startOfMonth.year();
    month.value = startOfMonth.month();
    month.id    = `${month.year}-${month.value}`;

    this.setState((state) => ({
      months: [...state.months, month],

    }));
  };

  getSelectedMonth = () => {
    return this.state.selectedMonth;
  };

  handleClickNext = () => {
    const next = this.getNextMonth(this.state.selectedMonth);

    // abort if end of list
    if (!next) return;

    this.setState(() => ({ selectedMonth: next }));
  };

  handleClickPrev = () => {
    const prev = this.getPrevMonth(this.state.selectedMonth);

    // abort if end of list
    if (!prev) return;

    this.setState(() => ({ selectedMonth: prev }));
  };

  getNextMonth = (month) => {
    const index = this.state.months.indexOf(month);

    // return if end of list
    if (index === this.state.months.length - 1) return;

    return this.state.months[index + 1];
  };

  getPrevMonth = (month) => {
    const index = this.state.months.indexOf(month);

    // return if in the beginning of list
    if (index === 0) return;

    return this.state.months[index - 1];
  };

  handleToggleShowList = () => {
    this.state.isOpen ? this.closeList() : this.openList();
  };

  handleMonthSelection = (selectedMonth) => {
    this.setState(() => ({ selectedMonth }));
    this.closeList();
  };

  handleDaySelection = (selectedDay) => {
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
    return this.state.months.map((month) => (<li key={month.id}
                                                 onClick={() => this.handleMonthSelection(month)}>{month.name()}</li>));
  };

  closeList = () => {
    this.setState(() => ({ isOpen: false }));
    document.removeEventListener('click', this.onClickOutside);
  };

  openList = () => {
    this.setState(() => ({ isOpen: true }));
    document.addEventListener('click', this.onClickOutside);
  };

  render() {
    return (
      <div className='calendar'>

        <IconClose className={'icon-close'}/>

        <div className="title">תאריך יציאה</div>

        <div className="month-picker">

          <IconNext className={'icon-next'}
                    onClick={this.handleClickNext}
                    disabled={!this.getNextMonth(this.state.selectedMonth)}/>

          <div className={classNames('months', { opened: this.state.isOpen })}
               ref={(element) => this.monthsListElem = element}>
            <div
              className="selected"
              onClick={this.handleToggleShowList}>{this.getSelectedMonth() && this.getSelectedMonth().name()}</div>
            <ul>
              {this.getMonthList()}
            </ul>
          </div>

          <IconPrevious className={'icon-previous'}
                        onClick={this.handleClickPrev}
                        disabled={!this.getPrevMonth(this.state.selectedMonth)}/>

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
               onClickDay={this.handleDaySelection}></Month>

        <Legend/>

      </div>
    )
  }
}

export default Datepicker;