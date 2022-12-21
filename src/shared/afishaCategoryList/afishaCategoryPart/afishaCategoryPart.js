import './afishaCategoryPart.scss'
import { el } from 'redom'
import $ from 'jquery'
import { filterObj } from '../../..';
import { afishaCard } from '../../afishaList/afishaCard/afishaCard';
import { makeAfishaArr } from '../../hooks/makeAfishaArr';
import { afishaSlider } from './afishaSlider/afishaSlider';
import { afishaList } from '../../afishaList/afishaList';
import { getAfisha } from '../../api';
import Swiper, {Navigation, Pagination} from 'swiper';



export function afishaCategoryPart (categoryArr) {
  const afishaPart = el('li.afishaCategoryPart');
  const divName = el('div.afishaCategoryName', `${categoryArr.themes_name}`);

  const btnOpen = el('button.afishaBtnCount', `Смотреть все`, {
    onclick(e) {
      $(afishaPart).find('.slider-container')[0].classList.toggle('slider-close');
      e.target.textContent === 'Смотреть все' ? e.target.textContent = 'Закрыть' : e.target.textContent = 'Смотреть все';
      const afishaList = $(afishaPart).find('.afisha__list')[0];
      afishaList.classList.toggle('afisha-open');

    }
  });

  const afishaPartTitleBlock = el('div.afisha-category-title-block', [divName]);

  afishaPart.append(afishaPartTitleBlock);
  let objToAfisha = Object.assign(filterObj); 
  objToAfisha.themes = categoryArr.theme_id;

  
  getAfisha(objToAfisha).then(res => {
    if (res.r && res.r.length > 0) {
      
      
      const allAfisha = afishaList(res.r);
      const slider = afishaSlider(res.r);
      let afishaCount = $(slider).find('.afisha-slider li').length;
      if (afishaCount > 3) {
        afishaPartTitleBlock.append(btnOpen);
      }
      afishaPart.append(slider);
      afishaPart.append(allAfisha);

      
      Swiper.use([Navigation, Pagination])
      Array.from($('.afisha-slider')).forEach(el => {
        const parent =  $(el).parent();
        const btns = $(parent).find('.slider-btn');
        const swiper = new Swiper(el, {
          slidesPerView: 3,
          spaceBetween: 75,
          slidesPerGroup: 3,
          pagination: {
            el: '.swiper-pagination',
            type: "fraction",
            clickable: true,
          },
          navigation: {
            nextEl: btns[1],
            prevEl: btns[0],
          },
        });
      });
    } else {
      const nullDiv = el('div.null-block', 'мероприятий нет');
      afishaPart.append(nullDiv);
    }
  });
  return afishaPart;
}