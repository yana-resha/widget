import { calendarType } from "../..";
import moment, {locale, add} from 'moment';

export function calendarPeriod () {
  const dateObj = {
    date_from: '',
    date_to: '',
    date: '',
  }
  if (calendarType.period.length === 0) {
    const today = moment().locale('ru').format('DD.MM.YYYY');
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let lastDay = new Date(y, m + 1, 0);
    lastDay = moment(lastDay).format('DD.MM.YYYY');
    dateObj.date_from = today;
    dateObj.date_to = lastDay;
  }

  if (calendarType.period.length > 0) {
    const period = Number(calendarType.period);
    const today = moment().locale('ru').format('DD.MM.YYYY');
    let lastDay;
    console.log(period)
    if (period === 30) {
      lastDay = moment().locale('ru').add( 1, 'month').format('DD.MM.YYYY');
      dateObj.date_from = today;
      dateObj.date_to = lastDay;
    }
    if (period !== 30 && period !== 1) {
      lastDay = moment().locale('ru').add( period, 'day').format('DD.MM.YYYY');
      dateObj.date_from = today;
      dateObj.date_to = lastDay;
    }
    if (period === 1) {
      dateObj.date = today;
    }

  }

  return dateObj;
}