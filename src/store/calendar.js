import { decorate, observable, computed } from "mobx";
import moment from "moment";
import Month from './month';

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

decorate(Calendar,
  {
    months: observable,
    isOpen: observable,
    selectedMonth: computed,
    selectedDay: computed,
    hoveredMonth: computed,
  });

export default Calendar;