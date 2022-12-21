import './afishaCard.scss'
import { el } from 'redom'
import $ from 'jquery'
import {langName} from '../../..';
import { cardBtn } from '../../cardBtn';

export function afishaCard (obj) {
 
  const card = el('li.afisha__card', '', {
    searchname: `${obj.ename}`,
  });

  let img = el('img.card-img', {
    src: '',
    alt: 'изображение мероприятия'
  })

  const contentBlock = el('div.afisha__card-content-block');


  const imgBlock = el('div.afisha__card-img-block', img)
  let cardTitle = el('div.card__title', `${obj.ename}`)
  let cardDescription = el('div.card__description');
  cardDescription.innerHTML = `${obj.preview_text}`;
  
  contentBlock.append(cardTitle, cardDescription)
  card.append(imgBlock);

  if (obj.short_description) {
    const p = el('p');
    p.innerHTML = `${obj.short_description}`
    contentBlock.append(p);
  }

  if (obj.date_to && obj.date_from) {
    const period = el('div.card__period-date', `${langName.date_to} ${obj.date_to} ${langName.date_from} ${obj.date_from}`);
    contentBlock.append(period)
  }

  card.append(contentBlock)

  const button = cardBtn(obj)
  card.append(button);
  return card;
}