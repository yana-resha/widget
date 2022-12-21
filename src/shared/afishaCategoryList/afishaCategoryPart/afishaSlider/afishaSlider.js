import './afishaSlider.scss'
import { el } from 'redom'
import $ from 'jquery'
import { afishaCard } from '../../../afishaList/afishaCard/afishaCard';
import { makeAfishaArr } from '../../../hooks/makeAfishaArr';






export function afishaSlider (arr) {

  let uniqArr = makeAfishaArr(arr);
  console.log(uniqArr)
  const sliderContainer = el('div.slider-container');
  const listAfisha = el('ul.afisha-slider.swiper');
  const wrapper = el('div.swiper-wrapper');
  const pag = el('div.swiper-pagination')
  const prev = el('div.swiper-button-prev slider-btn')
  const next = el('div.swiper-button-next slider-btn')
  listAfisha.append(wrapper)

  uniqArr.forEach((element, index) => {
    let card = afishaCard(element);
    
    card.classList.add('swiper-slide')
    wrapper.append(card)
  })

  sliderContainer.append(listAfisha, prev, next)



  return sliderContainer
}