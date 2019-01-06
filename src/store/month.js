import moment from "moment";
import { decorate, observable } from "mobx";
import Week from './week';


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

export default Month;