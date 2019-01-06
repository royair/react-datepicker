import moment from "moment";
import { decorate, observable } from "mobx";
import { InRangeDay, OutOfRangeDay } from './day';

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

decorate(Week,
  {
    id: observable,
    days: observable,
  });

export default Week;
