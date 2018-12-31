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

    this.monthsList = null;
    this.state      = {
      months: [],
      selectedMonth: {},
      selectedDay: {},
      isOpen: false,
    };
  }

  componentDidMount() {
    for (let i = 0; i < 12; i++) {
      const firstDayOfMonth = moment().startOf('month').add(i, 'M');

      this.populateMonth(firstDayOfMonth);
    }
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
      months: [...state.months, month]
    }));
  };

  getSelectedMonth = () => {
    return this.state.months.find((month) => month.selected);
  };

  getSelectedMonthIndex = () => {
    return this.state.months.findIndex((month) => month.selected);
  };

  onSelectMonth = () => {

  };

  onSelectDay = () => {

  };

  onNextMonth = () => {
    const nextMonth = this.getNextMonth();

    // abort in case of no next (end of array)
    if (!nextMonth) return;

    const months = this.state.months.map((month) => {
      if (month.selected) month.selected = false && month;
      if (month === nextMonth) month.selected = true;

      return month;
    });

    this.setState((state) => ({ months: [...months] }));
  };

  onPrevMonth = () => {
    const prevMonth = this.getPrevMonth();

    // abort in case of no next (end of array)
    if (!prevMonth) return;

    const months = this.state.months.map((month) => {
      if (month.selected) month.selected = false;
      if (month === prevMonth) month.selected = true;

      return month;
    });

    this.setState((state) => ({ months: [...months] }));
  };

  getNextMonth = () => {
    const selectedMonthIndex = this.getSelectedMonthIndex();
    return this.state.months[selectedMonthIndex + 1];
  };

  getPrevMonth = () => {
    const selectedMonthIndex = this.getSelectedMonthIndex();
    return this.state.months[selectedMonthIndex - 1];
  };

  onClickMonthList = () => {
    this.setState((oldState) => ({ isOpen: !oldState.isOpen }));
    document.addEventListener('click', this.onClickOutside);
  };

  onClickMonthItem = (selectedMonth) => {
    const months = this.state.months.map((month) => {
      if (month.selected) month.selected = false;
      if (month === selectedMonth) month.selected = true;

      return month;
    });

    this.setState((oldState) => ({ months: [...months] }));
    this.closeMenu();
  };

  arrowKeysHandler = (e) => {
    // ignore arrow keys if select options are closed
    if (!this.state.isOpen) return;
  };

  getMonthList = () => {
    return this.state.months.map((month) => (<li key={month.id}
                                                 onClick={() => this.onClickMonthItem(month)}>{month.name()}</li>));
  };

  onClickOutside = (e) => {
    if (!this.monthsList.contains(e.target)) this.closeMenu();
  };

  closeMenu = () => {
    this.setState((oldState) => ({ isOpen: false }));
    document.removeEventListener('click', this.onClickOutside);
  };

  render() {
    return (
      <div className='calendar'>

        <IconClose className={'icon-close'}/>

        <div className="title">תאריך יציאה</div>

        <div className="month-picker">

          <IconNext className={'icon-next'}
                    onClick={this.onNextMonth}
                    disabled={!this.getNextMonth()}/>

          <div className={classNames('months', { opened: this.state.isOpen })}
               ref={(element) => this.monthsList = element}>
            <div
              className="selected"
              onClick={this.onClickMonthList}>{this.getSelectedMonth() && this.getSelectedMonth().name()}</div>
            <ul>
              {this.getMonthList()}
            </ul>
          </div>

          <IconPrevious className={'icon-previous'}
                        onClick={this.onPrevMonth}
                        disabled={!this.getPrevMonth()}/>

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

        <Month month={this.getSelectedMonth()}></Month>

        <Legend/>

      </div>
    )
  }
}

export default Datepicker;