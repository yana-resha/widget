import $ from 'jquery'
import {calendarAfisha} from '../calendarAfisha/calendarAfisha'
import {afishaList} from '../afishaList/afishaList'
import {afishaCategoryList} from '../afishaCategoryList/afishaCategoryList'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {device} from '../../index';
import { filterObj } from "../../index";
import { getAfisha } from "../api";




export function createAfishaList (res) {

  const afishaSection = $('.afisha')[0];
  const container = $(afishaSection).find('.list-cont');
 
  getAfisha(filterObj).then(responce => { 
    let afisha;
    if (device.list === 'afishaCalendarList') {
      responce.r ? afisha = calendarAfisha(responce.r) : afisha = calendarAfisha([]);
    }
  
    if (device.list === 'afishaList') {
      responce.r ? afisha = afishaList(responce.r) : afisha = afishaList([]);
      
    }
  
    if (device.list === 'afishaCategoryList') {
      afisha = afishaCategoryList(res);
    }

    container[0].innerHTML = '';
    container.append(afisha);
  })


}
