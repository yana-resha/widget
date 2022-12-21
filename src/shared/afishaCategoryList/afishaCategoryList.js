import './afishaCategoryList.scss';
import { el } from 'redom';
import { afishaCategoryPart } from './afishaCategoryPart/afishaCategoryPart';


export function afishaCategoryList (arrCategory) {
  arrCategory = arrCategory.themes;
  const list = el('ul.afisha__list-category.afisha-block#afisha');
  if (arrCategory) {
    
    if (arrCategory.length > 0) {
      arrCategory.forEach(category => {
        const li = afishaCategoryPart(category);
        list.append(li);
      })
    } else list.textContent = 'мероприятий нет';

  } else {
    list.textContent = 'мероприятий нет';
  }

  return list
}
