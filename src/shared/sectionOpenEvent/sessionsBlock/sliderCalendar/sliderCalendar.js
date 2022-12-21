import { el } from "redom";
import moment, {locale, add, subtract}  from "moment";
import $ from 'jquery';
import { langName } from "../../../..";
import './sliderCalendar.scss';
import { device } from "../../../..";
import { getAfisha } from "../../../api";
import {askEvents} from '../../../hooks/askEvents';
import {smoothScroll} from '../../../hooks/smoothScroll';
import {chooseTicket} from '../../chooseTicket/chooseTicket';


function calendarBrain (today, nextOrPrev) {
  
  let dayArr = [];

  let lastDay;

  if (nextOrPrev === 'next') {
    dayArr.push(today)
    for (let i = 1; i < 14; ++i) {
      lastDay = moment(today).locale('ru').add(i, 'days').format('YYYY-MM-DD');
      dayArr.push(lastDay)
    }
  }
  if  (nextOrPrev === 'prev') {
   
    for (let i = 26; i > 0; --i) {
      lastDay = moment(today).locale('ru').subtract(i, 'days').format('YYYY-MM-DD');
      dayArr.push(lastDay)
    }
    dayArr.push(today)
    const spliceArr = dayArr.splice(0, 14)
    dayArr = spliceArr;
    lastDay = dayArr[dayArr.length - 1];
  }

 
  const beginningPeriod = dayArr[0];
  const endPeriod = dayArr[dayArr.length -1];

  const dateObj = {
    date_from : moment(beginningPeriod).local('ru').format('DD.MM.YYYY'),
    date_to : moment(endPeriod).local('ru').format('DD.MM.YYYY'),
  }

  let arrDateObj = dayArr.map(el => {
    moment(el).locale('ru').format('dddd, LL');
    let fulldate = el;
    let weekday = moment(el).locale(`${device.lang}`).format('dd');
    let numberDay = moment(el).locale('ru').format('D');
    let month = moment(el).locale(`${device.lang}`).format('MMMM');
    let year = moment(el).locale(`${device.lang}`).format('YYYY');
    let events = [];
    return {fulldate, weekday, numberDay, month, year, events};
  });

  return  {lastDay, arrDateObj, dateObj}
}

function calendarVisual (array, datePeriod) {

  const dateMonthContainer = el('div.date-month-container');
  getAfisha(datePeriod)
  .then(res =>  {
    if (res.r && res.r.length > 0) {
      res.r.forEach(el => {
        array.forEach(element => {
          const date = moment(element.fulldate).local('ru').format('DD.MM.YYYY')
          if (date === el.start_date) {
            element.events.push(el)
          }
        })
      })
    }
  })
  .then(() => {
    const monthContainer = el('div.monthContainer')
    const daysContainer = el('div.daysContainer');
    // ошибка если мероприятий нет
     const errorDiv = el('div.error-div', `${langName.eventNone}`);

    array.forEach(element => {
      
      const divDay = el('div.slider-calendar-count', `${element.numberDay}`);
      if (element.events.length > 0) {
        divDay.classList.add('free')
      }
      const divWeek = el('div.slider-calendar-week', `${element.weekday}`);
      const div = el('div.slider-calendar-day', {
        date: moment(element.fulldate).locale('ru').format('DD.MM.YYYY'),
        onclick () {
          const timeContainer = $('.session__time-container')[0];
          timeContainer.innerHTML = '';
          Array.from($('.slider-calendar-count')).forEach(el => {
            el.classList.remove('active');
          })
          divDay.classList.add('active');
          const calendarContainer = $('.slider-calendar-container')[0];
          
          errorDiv.remove();
          if (element.events.length === 0) {
            calendarContainer.append(errorDiv);
          } else {
            const inputTime = el('input.slider-calendar-input-time', {
              readonly:"readonly",
              placeholder: `${langName.chooseTime}`,
            });
            const divTime = el('div.timeCont');
            element.events.forEach(event => {
              const timeBtn = el('button.time-btn', `${event.session_time}`, {
                sid: event.sid,
                eid: event.eid,
                onclick(e) {
                  inputTime.value = e.target.textContent;

                  const chooseContToRemove = Array.from($('.choose__container'));
                  if (chooseContToRemove.length > 0) {
                    chooseContToRemove.forEach(el => el.remove());
                  }
                  
                  askEvents(event).then(res => {
                    const section = $('.open-event')[0];
                    const choose__container = chooseTicket (res)
                    const mainContainer = $(section).find('.container')[0];
                    mainContainer.append(choose__container);
                    smoothScroll(choose__container, 10);
                  })
                }
              })
              divTime.append(timeBtn);
            })
          timeContainer.append(inputTime,divTime)
          }
        }
      })
        
      div.append(divDay, divWeek);
      daysContainer.append(div);
    });
    let uniqMonth = [];
    array.forEach(element => {
      uniqMonth.push(`${element.month} ${element.year}`)
    })
    uniqMonth = Array.from(new Set(uniqMonth));
    uniqMonth.length === 1 ? monthContainer.textContent = uniqMonth[0] :  monthContainer.textContent = `${uniqMonth[0]}/${uniqMonth[1]}`;
    dateMonthContainer.append(monthContainer, daysContainer);
    
  })

  return dateMonthContainer
}



export function sliderCalendar (arr) {
  const dateBlock = el('div.session__slider-date-time-container');
  // const calendarContainer = el('div.session__slider-calendar-container');
  let today = moment().locale('ru').format('YYYY-MM-DD');
  
  let brainCalendar = calendarBrain(today, 'next');
 
  today = brainCalendar.lastDay;

  let arrForCalendar = brainCalendar.arrDateObj;

  let period = brainCalendar.dateObj;

  period.eid = arr.eid;
  period.themes = arr.themes;
  period.sid = '0';
  
  const calendarContainer = el('div.slider-calendar-container', {
    themes: arr.theme_id,
    eid: arr.eid,
    sid: '0',
  });

  dateBlock.append(calendarContainer)
  

  const timeContainer = el('div.session__time-container');
  let newArr;
  if (arr.r) {
    newArr = arr.r;
  } else {
    newArr = [];
  }

  const prevBtn = el('button.slider-calendar-btn.prev', '<', {
    disabled: true,
    onclick () {
      const errContainer = $('.error-div')[0];
      const timeContainer = $('.session__time-container')[0];
      timeContainer.innerHTML = '';
      if (errContainer) {
        errContainer.remove();
      }
      let brainCalendar = calendarBrain(today, 'prev');
      today = brainCalendar.lastDay;
      arrForCalendar = brainCalendar.arrDateObj;
      period.date_from = brainCalendar.dateObj.date_from;
      period.date_to = brainCalendar.dateObj.date_to;
      const minDate = moment().locale('ru').add( 13, 'days').format('YYYY-MM-DD');
      if (arrForCalendar[arrForCalendar.length - 1].fulldate === minDate) {
        prevBtn.disabled = true;
      }
      const calendar = $('.date-month-container')[0];

      calendar.classList.add('remove-prev');
      setTimeout(() => {
        calendar.remove()
        calendarContainer.append(calendarVisual(arrForCalendar, period));
      }, "300")
    }
  })

  const nextBtn = el('button.slider-calendar-btn.next', '>', {
    onclick () {
      const errContainer = $('.error-div')[0];
      const timeContainer = $('.session__time-container')[0];
      timeContainer.innerHTML = '';
      if (errContainer) {
        errContainer.remove();
      }
      let brainCalendarNext = calendarBrain(today, 'next');
      today = brainCalendarNext.lastDay;
      arrForCalendar = brainCalendarNext.arrDateObj;
      
      period.date_from = brainCalendarNext.dateObj.date_from;
      period.date_to = brainCalendarNext.dateObj.date_to;
      const calendar = $('.date-month-container')[0];
      calendar.classList.add('remove-next');
      setTimeout(() => {
        calendar.remove()
        calendarContainer.append(calendarVisual(arrForCalendar, period));
      }, "300");
      const minDate = moment().locale('ru').format('YYYY-MM-DD');
      if (today !== minDate) {
        prevBtn.disabled = false;
      }
    }
  })

  calendarContainer.append(prevBtn, nextBtn, calendarVisual(arrForCalendar, period));

  dateBlock.append(timeContainer)
  
  return dateBlock;

}