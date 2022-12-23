import $ from 'jquery';
import { openEvent, getAfisha } from '../api';
import {el} from 'redom';
import moment from 'moment';
import { createEnableArr } from './createEnableArr';
import { langName } from '../..';
import { askEvents } from './askEvents';
import { smoothScroll } from './smoothScroll';
import { chooseTicket } from '../sectionOpenEvent/chooseTicket/chooseTicket';





export function onChange (dateStr, newArr) {

  const timeContainer = $('.session__time-container')[0];
  timeContainer.innerHTML = '';
  timeContainer.classList.remove('on-open');
  const inputTime = el('input.time-input', {
    readonly:"readonly",
    placeholder: `${langName.chooseTime}`,
  });
  const dropdown = el('div.dropdown-time');
  timeContainer.append(inputTime, dropdown);
  let filterDay = newArr.filter(el => el.start_date === dateStr);
  if (filterDay.length > 0) {
    timeContainer.classList.add('on-open');
    filterDay.forEach(element => {
      const btn = el('button.btn-time', `${element.session_time}`, {
        sid: `${element.sid}`,
        eid: `${element.eid}`,

        onclick(e) {
          inputTime.value = e.target.textContent;
          askEvents(element).then(res => {
            const section = $('.open-event')[0];
            const choose__container = chooseTicket(res);
            const mainContainer = $(section).find('.container')[0];
            mainContainer.append(choose__container);

            smoothScroll(choose__container, 10);
          })
        }
      });
      dropdown.append(btn);
    })
  }
  return newArr
}

export function onMonthChange (calendar, newArr) {
  const timeContainer = $('.session__time-container')[0];
  timeContainer.innerHTML = '';
  timeContainer.classList.remove('on-open');
  let firstDay = new Date(`${calendar.currentYear}-${calendar.currentMonth + 1}-01`);
  let y = new Date(firstDay).getFullYear();
  let m = new Date(firstDay).getMonth();
  let lastDay = new Date(y, m + 1, 0);
  lastDay = moment(lastDay).format('DD.MM.YYYY');
  firstDay = moment(firstDay).format('DD.MM.YYYY');
  let btnEvent = $('button[event="open"]')[0];
  let newObj = {
    eid: $(btnEvent).attr('eid'), themes: $(btnEvent).attr('themes'), date_from: firstDay, date_to: lastDay, sid: $(btnEvent).attr('sid'),
  }

  return getAfisha(newObj).then(res => {
    console.log(res)
    newArr = res.r;
    !res.r || res.r.length <= 0 ? alert('мероприятий нет') : calendar.set('enable', createEnableArr(res.r));
    return newArr;
  })
}