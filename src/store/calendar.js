import { decorate, observable, computed, action, autorun } from "mobx";
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

  get days() {
    // abort if not weeks
    if (!this.months) return undefined;

    let weeks = this.months.reduce((acc, curr) => acc.concat(curr.weeks), []);
    let days  = weeks.reduce((acc, curr) => acc.concat(curr.days), []);
    return days;
  }

  get selectedMonth() {
    return this.months.find((month) => month.selected);
  };

  set selectedMonth(month) {
    this.months.forEach((month) => month.selected = false);
    month.selected    = true;
    this.hoveredMonth = month;
  }

  get hoveredMonth() {
    return this.months && this.months.find((month) => month.hovered);
  };

  set hoveredMonth(month) {
    this.months.forEach((month) => month.hovered = false);
    month && (month.hovered = true);
  }

  get hoveredDay() {
    return this.days && this.days.find((day) => day.hovered);
  }

  set hoveredDay(day) {
    this.days && this.days.forEach((day) => day.hovered = false);

    day.hovered = true;
  }

  get endHoveredDay() {
    return this.days && this.days.find((day) => day.endHoveredDay);
  }

  set endHoveredDay(day) {
    this.days.forEach((d) => {
      // reset all days
      d.endHoveredDay = false;
      d.hovered       = false;
    });

    // set desired day to be endHoveredDay
    day.endHoveredDay = true;
    day.hovered       = true;
  }

  get startDay() {
    return this.days && this.days.find((day) => day.startDay);
  }

  set startDay(day) {
    this.days.forEach((d) => {
      // reset all days
      d.startDay      = false;
      d.endDay        = false;
      d.selected      = false;
      d.hovered       = false;
      d.endHoveredDay = false;

      // set for selected day
      if (d === day) {
        day.startDay = true;
        day.selected = true;
      }
    });
  }

  get endDay() {
    return this.days && this.days.find((day) => day.endDay);
  }

  set endDay(day) {
    day.endDay   = true;
    day.selected = true;
  }

  selectDay(day) {
    if (!this.startDay && !this.endDay) {
      this.startDay = day;
    } else if (this.startDay && !this.endDay) {
      // set as startDay if selecting earlier startDay the existing one
      if (day.date.isBefore(this.startDay.date, 'day'))
        return this.startDay = day;

      this.endDay = day;
    } else if (this.startDay && this.endDay) {
      this.startDay = day;
    }
  }

  handleHoveredDay(day) {
    if (!this.startDay && !this.endDay) {
      this.hoveredDay = day;

    } else if (this.startDay && !this.endDay) {
      if (day.date.isSameOrBefore(this.startDay.date, 'day'))
        this.hoveredDay = day;

      else if (day.date.isAfter(this.startDay.date, 'day'))
        this.endHoveredDay = day;

    } else if (this.startDay && this.endDay) {

    }
  }

  setInRangeSelectedDays = autorun(() => {
    // abort if no range
    if (!this.startDay || !this.endDay) return;

    this.days.forEach((day) => {
      const startDate = this.startDay.date;
      const endDate   = this.endDay.date;

      day.date.isBetween(startDate, endDate, 'day', '()') && (day.selected = true)
    });
  });

  setInRangeHoveredDays = autorun(() => {
    // abort if no range
    if (!this.startDay || !this.endHoveredDay) return;

    this.days.forEach((day) => {
      const startDate      = this.startDay.date;
      const endHoveredDate = this.endHoveredDay.date;

      day.date.isBetween(startDate, endHoveredDate, 'day', '()') && (day.hovered = true)
    });
  });
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
  }
}

export class Day {
  constructor(date) {
    this.id            = date.format('x');
    this.date          = moment(date);
    this.selected      = false;
    this.hovered       = false;
    this.endHoveredDay = false;
    this.startDay      = false;
    this.endDay        = false;
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
    days: computed,
    selectedMonth: computed,
    hoveredMonth: computed,
    endHoveredDay: computed,
    startDay: computed,
    endDay: computed,
    selectDay: action,
    setHoveredDay: action,
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
    selected: observable,
    hovered: observable,
    endHoveredDay: observable,
    startDay: observable,
    endDay: observable,
  });

export default Calendar;