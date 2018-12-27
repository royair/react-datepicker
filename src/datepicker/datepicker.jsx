import React, { Component } from 'react';

import './datepicker.scss';


class Datepicker extends Component {
  render() {
    return (
      <div className='calendar'>

        <div>
          <svg className="icon-close" xmlns="http://www.w3.org/2000/svg"
               viewBox="63 63 386 386">
            <path
              d="M437.5 386.6L306.9 256l130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9 0L256 205.1 125.4 74.5c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9L205.1 256 74.5 386.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0L256 306.9l130.6 130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z"/>
          </svg>
        </div>

        <div className="title">תאריך יציאה</div>

        <div className="month-picker">

          <div className="icon-container">
            <svg className="icon icon-next"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="8 6 8 12">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>

          <div className="months opened">
            <div className="selected">2019 דצמבר</div>
            <ul>
              <li>2019 דצמבר</li>
              <li> 2019 ינואר</li>
              <li> 2019 פברואר</li>
              <li> 2019 מרץ</li>
              <li> 2019 אפריל</li>
              <li> 2019 מאי</li>
              <li> 2019 יוני</li>
              <li> 2019 יולי</li>
              <li> 2019 אוגוסט</li>
              <li> 2019 ספטמבר</li>
              <li> 2019 אוקטובר</li>
              <li> 2019 נובמבר</li>
              <li> 2019 דצמבר</li>
            </ul>
          </div>

          <div className="icon-container">
            <svg className="icon icon-previous"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="8 6 8 12">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>

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

        <div className="month">
          <div className="week">
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable ">12</span>
            <span className="day selectable selected">12</span>
            <span className="day">12</span>
            <span className="day">12</span>
            <span className="day">12</span>
          </div>

          <div className="week">
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable ">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
          </div>

          <div className="week">
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable ">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
          </div>

          <div className="week">
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable ">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
          </div>

          <div className="week">
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable ">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
            <span className="day selectable">12</span>
          </div>

          <div className="legend">
            <ul>
              <li>
                <span className='circle blue'></span>
                <label>תאריכי יציאה וחזרה אפשריים</label>
              </li>
              <li>
                <span className='circle pink'></span>
                <label>אפשרית טיסת צ'רטר בתאריכים אלו</label>
              </li>

            </ul>
          </div>

        </div>
      </div>
    )
  }
}


export default Datepicker;