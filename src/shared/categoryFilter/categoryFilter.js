import './categoryFilter.scss'
import { el } from 'redom'
import $ from 'jquery'
import { filterObj } from '../..';
import { applyFilter } from '../hooks/applyFilter';
import { getItem } from '../localStorage';
import { storageKeyLang } from '../..';

export function categoryFilter (arr) {
  const langName = getItem(storageKeyLang);

  const categoryContainer = el('div.category-container');
  const categoryDropdown = el('ul.category-list');

  const categoryBtn = el('input.category-input', `${langName.categoryFilter}`, {
    placeholder: 'Поиск по категории',
    readonly:"readonly",
    onclick () {
      categoryDropdown.classList.toggle('dropdown-open');
      document.addEventListener('click', (e) => {
        if (e.target !== categoryDropdown && e.target !== categoryBtn) categoryDropdown.classList.remove('dropdown-open')
      })
      
    }
  });
  categoryContainer.append(categoryBtn, categoryDropdown);



  if (arr && arr.length > 0) {
    arr.forEach(element => {
      const li = el('li.category-list-part', el(`button.category-list-part-btn#${element.theme_id}`, `${element.themes_name}`, {
        onclick(e) {
          filterObj.themes = e.target.id;
          applyFilter ()
        }
      }))
      categoryDropdown.append(li);
    })
    
    
  }
  return categoryContainer;
}

