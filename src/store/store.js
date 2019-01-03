import { observable, decorate } from 'mobx';
import Calendar from './calendar';

class Store {
  calendar = new Calendar();
}

decorate(Store, { calendar: observable });

export default new Store();
