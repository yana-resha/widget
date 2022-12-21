import './calendarList.scss';
import $ from 'jquery';
import {el} from 'redom';
import { device } from '../../../..';
import { langName } from '../../../..';
import moment, {locale, add, subtract}  from "moment";
import { getAfisha, loadComplex } from '../../../api';
import { askEvents } from '../../../hooks/askEvents';
import { chooseTicket } from '../../chooseTicket/chooseTicket';
import { smoothScroll } from '../../../hooks/smoothScroll';





export function calendarList (arr) {
  const section = $('.open-event')[0];
  const list = el('ul.calendar-list');
  let date_from = moment().local('ru').format('DD.MM.YYYY');
  let date_to = moment().local('ru').add(1, 'years').format('DD.MM.YYYY')
  let eid = arr.eid;
  let sid = '0';
  let themes = arr.themes;

  let objToQuestion = {
    date_from: date_from,
    date_to: date_to,
    eid: eid,
    sid: sid,
    themes: themes,
  }


  getAfisha(objToQuestion).then(res => {
    if (res.r && res.r.length > 0) {
      res.r.forEach(event => {
        const li = el('li.calendar-list-part');
        const divName = el('div', `${event.ename}`);
        const divDate = el('div', `${event.session_date}: ${event.session_time} `);
        const btnPay = el('button', `${langName.payBtn}`, {
          eid: event.eid,
          sid: event.sid,
          hid: event.hall_id,
          type: event.events_type_id,
          onclick () {
            const chooseContToRemove = Array.from($('.choose__container'));
            if (chooseContToRemove.length > 0) {
              chooseContToRemove.forEach(el => el.remove());
            }
            
            askEvents(event).then(res => {
              const choose__container = chooseTicket (res)
              const mainContainer = $(section).find('.container')[0];
              mainContainer.append(choose__container);
              smoothScroll(choose__container, 10);
            })
            
          }
        });
        
        li.append(divDate, divName, btnPay)
        list.append(li);
      })
    }
  }) 

  return list;
}
