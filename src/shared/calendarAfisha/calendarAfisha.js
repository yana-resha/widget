import './calendarAfisha.scss'
import { el } from 'redom'
import $ from 'jquery'
import { makeAfishaForDate } from '../hooks/makeAfishaForDate';
import { calendarAfishaCard } from './calendarAfishaCard/calendarAfishaCard';
import { langName } from '../..';

export function calendarAfisha (arr) {
  
  const calendarList = el('ul.calendar-afisha-list.calendar-list#afisha');
  const dateArr = makeAfishaForDate(arr);

  if (dateArr.length === 0) {
    calendarList.textContent = `${langName.eventNone}`;
  }
  if (dateArr.length > 0) {
    dateArr.forEach(element => {
      const card = calendarAfishaCard(element);
      calendarList.append(card);
    });
  }

  return calendarList;
}