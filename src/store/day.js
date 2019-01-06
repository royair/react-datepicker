import moment from "moment";
import { decorate, observable } from "mobx";

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

decorate(Day,
  {
    id: observable,
    date: observable,
    prev: observable,
    next: observable,
    selected: observable,
  });

