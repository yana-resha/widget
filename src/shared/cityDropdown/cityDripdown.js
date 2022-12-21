import './cityDropdown.scss'
import { el } from 'redom'
import $ from 'jquery'
import {storageKeyLang} from '../../index'
import { getItem } from '../localStorage'


export function cityDropdown (arr) {
  const langName = getItem(storageKeyLang);
  const cityDropdownContainer = el('div.city-container');
  const cityList = el('ul.city-list');
  
  const button = el('button.city-btn', `${langName.cityFilter}`, {
    onclick() {
      cityList.classList.toggle('dropdown-open');
    }
  }
 );

  arr.forEach(element => {
    const li = el('li.city-list-part', `${element}`, {
      onclick() {
        button.textContent = li.textContent;
        cityList.classList.remove('dropdown-open');
      }
    });
    cityList.append(li);
  });
  cityDropdownContainer.append(button, cityList);
  return cityDropdownContainer
}