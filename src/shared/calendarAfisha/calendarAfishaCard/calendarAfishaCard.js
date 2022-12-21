import './calendarAfishaCard.scss'
import { el } from 'redom'
import $, { timers } from 'jquery'
import moment, {locale} from 'moment';
import 'moment';
import { langName } from '../../..';
import { device } from '../../..';
import { cardBtn } from '../../cardBtn';

export function calendarAfishaCard (obj) {
  const calendarAfishaCard = el('li.calendar-afisha-card', {
    searchname: `${obj.ename}`
  });

  let date;

  device.lang === 'ru' ? date = moment(obj.session_date).locale('ru').format('LL') : date = moment(obj.session_date).locale('eng').format('LL');
  
  const dateBlock = el('div.calendar-card__date-block', `${date}`)
  
  const contentBlock = el('div.calendar-card__content-block');
  const cardTitle = el('div.calendar-card__title', `${obj.ename}`);
  const cardDescription = el('div.calendar-card__description');
  cardDescription.innerHTML = obj.preview_text;
  const cardTimesDesc = el('div.calendar-card__times-desc',{
    onclick () {
      cardTimesDropdown.classList.toggle('dropdown-open')
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target !== cardTimesDesc && e.target !== cardTimesDropdown && cardTimesDropdown.classList.contains('dropdown-open')) {
      cardTimesDropdown.classList.remove('dropdown-open');
    }
  })

  const cardTimesDropdown = el('div.calendar-card__dropdown-block');


  if (obj.range_times) {
    
    obj.all_times.forEach(element => {
      const dropdownPart = el('div.calendar-card__dropdown-part', `${element}`);
      cardTimesDropdown.append(dropdownPart)
    })
  
    cardTimesDesc.textContent = `${langName.timeSessionRange1} ${obj.range_times[0]} ${langName.date_from} ${obj.range_times[1]}`;
    // cardTimesDesc.append(cardTimesDropdown)
  } else {
    cardTimesDesc.textContent = `${langName.rangeSession}: ${obj.all_times[0]}`;
  }
    
  
  contentBlock.append(cardTitle, cardDescription, cardTimesDesc)

  const cardPayBlock = el('div.calendar-card__pay-block');
  const cardPayBtn = cardBtn(obj);
  cardPayBlock.append(cardPayBtn);
  calendarAfishaCard.append(dateBlock, contentBlock, cardPayBlock)
  return calendarAfishaCard;
}

