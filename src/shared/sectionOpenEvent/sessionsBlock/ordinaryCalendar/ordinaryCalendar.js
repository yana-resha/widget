import { el } from "redom";
import moment, {locale, add}  from "moment";
import { createEnableArr } from "../../../hooks/createEnableArr";
import $ from 'jquery';
import flatpickr from 'flatpickr';
import { langName } from "../../../..";
import './ordinaryCalendar.scss';
import { onChange, onMonthChange } from "../../../hooks/calendarOnChange";

export function ordinaryCalendar (arr) {

  const dateBlock = el('div.session__date-time-container');
  const calendarContainer = el('div.session__calendar-container')
  const input = el('input.session__calendar-input', {
    placeholder: `${langName.dateFilter}`,
  });

  // для времени контейнер и его элементы
  const timeContainer = el('div.session__time-container');
  let newArr;
  if (arr.r) {
    newArr = arr.r;
  } else {
    newArr = [];
  }
  
  const enableArr = createEnableArr(arr.r);
  calendarContainer.append(input);
  const calendar = flatpickr(input, {
    appendTo: calendarContainer,
    inline: true,
    locale: 'ru',
    dateFormat: 'd.m.Y',
    minDate: 'today',
    enable: enableArr,
    onChange: function(selectedDates, dateStr, instance) {
      onChange (dateStr, newArr); 
  },
    onMonthChange(e) {
      onMonthChange(calendar, newArr).then(arr => {
        if (arr) {
          newArr = arr;
        } else {
          newArr = [];
        }
      })
    },
  }
  );
  dateBlock.append(calendarContainer, timeContainer);
  return dateBlock;
}