import './sessionsBlock.scss';
import {el} from 'redom';
import $ from 'jquery';
import jQuery from 'jquery';
import flatpickr from 'flatpickr';
import {langName} from '../../../';
import { Russian } from "flatpickr/dist/l10n/ru.js";
import moment, {locale, add} from 'moment';
import { getAfisha, openEvent } from '../../api';
import { calendarType } from '../../../';
import { ordinaryCalendar } from './ordinaryCalendar/ordinaryCalendar';
import { sliderCalendar } from './sliderCalendar/sliderCalendar';
import { calendarList } from './calendarList/calendarList';


export function sessionsBlock (arr) {

 
  const container = el('div.session__container');

  let dateBlock;
  if (calendarType.calendar_type_id == 1 && calendarType.period.length === 0) {
    dateBlock = ordinaryCalendar (arr)
  }
  if (calendarType.calendar_type_id == 2 && calendarType.period.length === 0) {
    dateBlock = sliderCalendar (arr)
  }

  if (calendarType.calendar_type_id == 3 && calendarType.period.length === 0) {
    dateBlock = calendarList (arr)
  }

  if (dateBlock) container.append(dateBlock);

  return container;
}