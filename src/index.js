import './main.scss'
import $ from 'jquery'
import Navigo from 'navigo';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {getAfisha, newuserOnlyStart } from './shared/api';
import { getItem, setItem } from './shared/localStorage';
import { createDataForFilterObj } from './shared/hooks/createDataForFilterObj';
import { createWindow } from './shared/createSection/createWindow';
import { createAfishaList } from './shared/createSection/createAfishaList';
import {ru} from './shared/languages/ru'


export const device = {
  window: 'iframe',
  list: 'afishaList',
  lang: 'ru',
  filter: {
    city: 'y',
    category: 'y',
  },
}

// afishaList
// afishaCalendarList
export const calendarType = {
  calendar_type_id: "1", // '1' - обычный календарь, "2" - календарь слайдер, "3" - список на год вперед
  color: "", 
  period: "", //если период не пустая строка то календаря не будет точно, если период пустой то
  // выводим календарь с сегодняшнего для и до конца месяца 
  //допустимое значение только строка с числом , если хотят сделать сегодня то пусть указывают 1
}

// хранит sidhash в течении одной сессии, я его аргументами не таскаю
export const storageKeySidHash = 'sidhash';
export const storageKeyLang = 'lang'
export const langName = getItem(storageKeyLang);
const router = new Navigo('/');


export let filterObj;


router.on('/', () => {
  setItem(storageKeySidHash, '');
  if (device.lang === 'ru') {
    setItem(storageKeyLang, ru);
  }
  // 2,7,10,4,3 темы пушки
  // 12 тема муар
  router.navigate('/f1c1592588411002af340cbaedd6fc33/0/0/2,7,10,4,3/15.11.2022-10.01.2023/0/0/');
})








router.on('/:token/:city/:owner/:themes/:date/:eid/:sid/', ({ data }) => {
  
  const sidhash = getItem(storageKeySidHash);
  filterObj = data;
  createDataForFilterObj(data.date);
  if (sidhash.length <= 0) {
    const startInfo = newuserOnlyStart(filterObj.token).then(res => {
      setItem(storageKeySidHash, res.sidhash);
      if (data.themes !== '0' && device.filter === null) {
        createWindow();
      } else {
        createWindow(res);
      };
      $('.list-cont')[0].innerHTML = 'Подождите идет загрузка';
        createAfishaList(res);
    });
  } 
  else {
    const startInfo = newuserOnlyStart(filterObj.token).then(res => {
    setItem(storageKeySidHash, res.sidhash);
    if (data.themes !== '0' && device.filter === null) {
      createWindow();
    } else {
      createWindow(res);
    };
    $('.list-cont')[0].innerHTML = `${langName.loading}`;
      createAfishaList(res);
   });
  }
})

router.resolve();