import { decorate, observable, computed } from "mobx";
import moment from "moment";

class Calendar {
  constructor() {
    this.months = [];
    this.isOpen = false;

    this.init();
  }

  init = () => {
    // run for next 12 months
    for (let i = 0; i < 12; i++) {
      const startOfMonth = moment().startOf('month').add(i, 'M');
      const month        = new Month(startOfMonth);

      this.months.push(month);
    }

    // add prev & next to each month
    this.months.forEach((month, index, months) => {
      month.prev = months[index - 1];
      month.next = months[index + 1];
    });
  };

  get selectedMonth() {
    return this.months.find((month) => month.selected);
  };

  set selectedMonth(month) {
    this.months.forEach((month) => month.selected = false);
    month.selected    = true;
    this.hoveredMonth = month;
  }

  get selectedDay() {
    let weeks = this.months.reduce((acc, curr) => acc.concat(curr.weeks), []);
    let days  = weeks.reduce((acc, curr) => acc.concat(curr.days), []);
    return days.find((day) => day.selected);
  };

  set selectedDay(day) {
    let weeks = this.months.reduce((acc, curr) => acc.concat(curr.weeks), []);
    let days  = weeks.reduce((acc, curr) => acc.concat(curr.days), []);
    days.forEach((day) => day.selected = false);
    day.selected = true;
  }

  get hoveredMonth() {
    return this.months.find((month) => month.hovered);
  };

  set hoveredMonth(month) {
    this.months.forEach((month) => month.hovered = false);
    month && (month.hovered = true);
  }
}

class Month {
  constructor(startOfMonth) {
    let monthNames       = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
    let today            = moment();
    let endOfMonth       = moment(startOfMonth).endOf('month');
    let endOfWeekMonth   = moment(startOfMonth).endOf('month').day('saturday');
    let startOfWeekMonth = moment(startOfMonth).startOf('month').day('sunday');
    let current          = moment(startOfWeekMonth);

    this.year     = startOfMonth.year();
    this.value    = startOfMonth.month();
    this.id       = `${this.year}-${this.value}`;
    this.name     = `${monthNames[this.value]} ${this.year}`;
    this.selected = today.isSame(startOfMonth, 'month') ? true : false;
    this.hovered  = false;
    this.weeks    = [];

    // run for each week of the month
    while (current.isSameOrBefore(endOfWeekMonth, 'day')) {
      let week = new Week(current, startOfMonth, endOfMonth);

      this.weeks.push(week);

      current.add(1, 'week');
    }
  }
}

class Week {
  constructor(startOfWeek, startOfMonth, endOfMonth) {
    this.id   = startOfWeek.week();
    this.days = [];

    // loop for 7 days of week
    for (let i = 0; i < 7; i++) {
      let date = new moment(startOfWeek).add(i, 'day');
      let day  = date.isBetween(startOfMonth, endOfMonth, 'day', '[]')
        ? new InRangeDay(date)
        : new OutOfRangeDay(date);

      this.days.push(day);
    }
    // change order of days to match rtl languages
    this.days.replace(this.days.slice().reverse());
  }
}

export class Day {
  constructor(date) {
    this.id       = date.format('x');
    this.date     = moment(date);
    this.prev     = undefined;
    this.next     = undefined;
    this.selected = false;
  }
}

export class InRangeDay extends Day {
  constructor(date) {
    super(date);

    let today = moment();

    this.value      = date.format('D');
    this.selectable = date.isSameOrAfter(today, 'day');
  }
}

export class OutOfRangeDay extends Day {
  constructor(date) {
    super(date);

    this.value      = undefined;
    this.selectable = false;
  }
}

decorate(Calendar,
  {
    months: observable,
    isOpen: observable,
    selectedMonth: computed,
    selectedDay: computed,
    hoveredMonth: computed,
  });

decorate(Month,
  {
    year: observable,
    value: observable,
    id: observable,
    name: observable,
    selected: observable,
    hovered: observable,
    weeks: observable,
  });

decorate(Week,
  {
    id: observable,
    days: observable,
  });

decorate(Day,
  {
    id: observable,
    date: observable,
    prev: observable,
    next: observable,
    selected: observable,
  });

export default Calendar;