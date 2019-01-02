import { observable, decorate } from 'mobx';
import Calendar from './calendar';

class Store {
  calendar = new Calendar();
}

decorate(Store, { calendar: observable });

console.log(new Store());

export default new Store();