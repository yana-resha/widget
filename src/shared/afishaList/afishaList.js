import './afishaList.scss'
import { el } from 'redom'
import { afishaCard } from './afishaCard/afishaCard';
import { makeAfishaArr } from '../hooks/makeAfishaArr';
import { langName } from '../..';



export function afishaList (arr) {
  const list = el('ul.afisha__list.afisha-block#afisha');

  let uniqArr = makeAfishaArr(arr);

  if (arr) {
    if (arr.length > 0) {
      uniqArr.forEach(el => {
        const card = afishaCard(el);
        list.append(card);
      })
    } else list.textContent = `${langName.eventNone}`;
  } else {
    list.textContent = `${langName.eventNone}`;
  }

  return list
}
