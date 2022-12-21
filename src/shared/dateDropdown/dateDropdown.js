import './dateDropdown.scss';
import { el } from 'redom';
import flatpickr from 'flatpickr';
import "flatpickr/dist/themes/light.css";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import $ from 'jquery';
import moment, {locale, add} from 'moment';
import 'moment';
import { filterObj } from '../..';
import { createDataForFilterObj } from '../hooks/createDataForFilterObj';
import { applyFilter } from '../hooks/applyFilter';
import {langName} from '../..';

export function dateDropdown () {

  let flatpickrArrDate;
  filterObj.data_to && filterObj.data_from ? flatpickrArrDate= [filterObj.data_from, filterObj.data_to] : flatpickrArrDate = [filterObj.data]

  const dateDropdownContainer = el('div.date-container', {
  
  })
  
  const input = el('input.date-input',  {
    placeholder: `${langName.dateFilter}`,
    onclick (event) {
      dropdown.classList.toggle('dropdown-open');
    },
    onchange(e) {
      createDataForFilterObj(e.target.value);
      // filterObj.date_to && filterObj.date_from ? flatpickrArrDate= [filterObj.date_from, filterObj.date_to] : flatpickrArrDate = [filterObj.date];
      // calendar.config.defaultDate = flatpickrArrDate;
    }
  }
 );

 
 document.addEventListener('click', (e) => {
  // e.stopPropagation();
  const dropChild = Array.from($(dateDropdownContainer).children());
  
  if (dropChild.every(el => el !== e.target) === true) {
    // dropdown.classList.remove('dropdown-open');
  }
 })
 

 const containerForFlat = el('div.flat-container');



    
 const calendar = flatpickr(input, {
  clickOpens: false,
  dateFormat: 'd.m.Y',
  mode: "range",
  locale: 'ru',
  rangeSeparator: 'to',
  minDate: "today",
  defaultDate: flatpickrArrDate,
  appendTo : containerForFlat,
  inline: true,
  onChange: function(selectedDates, dateStr, instance) {
    instance.element.value = dateStr.replace('—', '-');
  }
  // locale: {
  //   

  // }
 });



 
 const dropdown = el('div.date-dropdown', [
  el('button', 'на сегодня', {
    onclick() {
      const today = moment().locale('ru').format('DD.MM.YYYY');
      calendar.setDate(today);
      filterObj.date = today;
      dropdown.classList.toggle('dropdown-open');
      applyFilter();
    }
  }), 
  el('button', 'на месяц', {
    onclick (e) {
      const today = moment().locale('ru').format('DD.MM.YYYY');
      const fromDate = moment().locale('ru').add( 1, 'month').format('DD.MM.YYYY');
      createDataForFilterObj(`${today}-${fromDate}`);
      filterObj.date_to && filterObj.date_from ? flatpickrArrDate= [filterObj.date_from, filterObj.date_to] : flatpickrArrDate = [filterObj.date];
      calendar.setDate(flatpickrArrDate);
      dropdown.classList.toggle('dropdown-open');
      applyFilter();
    }
  }),
  el('button', 'на неделю', {
    onclick() {
      const today = moment().locale('ru').format('DD.MM.YYYY');
      const fromDate = moment().locale('ru').add(7, 'days').format('DD.MM.YYYY');
      createDataForFilterObj(`${today}-${fromDate}`);
      filterObj.date_to && filterObj.date_from ? flatpickrArrDate = [filterObj.date_from, filterObj.date_to] : flatpickrArrDate = [filterObj.date];
      calendar.setDate(flatpickrArrDate)
      dropdown.classList.toggle('dropdown-open');
      applyFilter();
    }

   }),
  containerForFlat,
  el('button', 'Применить', {
    onclick () {
      dropdown.classList.toggle('dropdown-open');
      applyFilter();
    }
   })
 ]);
 
 
 dateDropdownContainer.append(input, dropdown)
 return dateDropdownContainer;
}