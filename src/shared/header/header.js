import './header.scss'
import { el } from 'redom'
import $ from 'jquery'
import { container } from '../container/container';
import { cityDropdown } from '../cityDropdown/cityDripdown';
import { dateDropdown } from '../dateDropdown/dateDropdown';
import { inputSearch } from '../inputSearch/inputSearch';
import { categoryFilter } from '../categoryFilter/categoryFilter';


export function Header (categoryArr) {

  let cont = container();
  cont.classList.add('header__container');
  const header = el('div.header', cont);

  
  if (categoryArr) {
    if (categoryArr.city) {
      const city = cityDropdown(categoryArr.city);
      cont.append(city)
    }
    if (categoryArr.themes) {
      const categoryDrop = categoryFilter(categoryArr.themes);
      cont.append(categoryDrop)
    }

  }

  
  const dateDrop = dateDropdown();
  const search = inputSearch ();
  cont.append(dateDrop,search)


  return header;
}