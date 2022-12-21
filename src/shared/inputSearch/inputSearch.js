import './inputSearch.scss'
import { el } from 'redom'
import $ from 'jquery'
import {langName} from '../..';

export function inputSearch () {
  
  const input = el('input.input-search', {
    placeholder: `${langName.searchInput}`,
    oninput (e) {
      const list = $('#afisha')[0];
      const listCards = Array.from($(list).find('li'));
      listCards.forEach(card => {
        const cardAttr = $(card).attr('searchname').toLowerCase();
        !cardAttr.includes(e.target.value.toLowerCase()) ? card.style.display = 'none': card.style.display = '';

      
      })
      if (e.target.value.length > 0) {
        console.log(e.target.value)

      }
    }
  })

  return input;
}