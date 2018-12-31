import React, { Component } from 'react';

export function Legend() {
  return (
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
  );
}
