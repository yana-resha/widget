import './chooseTicket.scss';
import $ from 'jquery';
import { el } from 'redom';
import { chechboxBlock } from './checkboxBlock/checkboxBlock';
import { openEvent } from '../../api';
import { infoBlock } from './infoBlock/infoBlock';
import { createYandexMap } from '../../hooks/createYandexMap';


function getTarif(d) {



  let levels = d.r;

  let prices = [];//преобразовываем в удобный массив
  let price_color = [];
  var prices_gr = [];
  //$('.hallname').html(d['hallname']);
  d.p.forEach(el => {

    let arr = el;
    if (!prices[arr.gr]) {
      prices[arr.gr] = [];
    } 
    if(!prices[ arr.gr ] [ arr.sort ||0 ]) {
      prices[ arr.gr ] [ arr.sort || 0 ] = [];
    }

    prices[ arr.gr ][ arr.sort||0 ][ arr.tid ] = arr;

    if(!price_color[ arr.gr ])
    price_color[ arr.gr ] = arr;
    
  })


  var sids = [];
  var sum  = 0;
  var min  = 0; //минимальное количество билетов 

  levels.forEach(el => {

    sids[el.ei_id] = el.sid;
    sum += parseInt(el.tq_free);
    if(parseInt(el.tq_free < min || !min)) min = parseInt(levels[i]['tq_free']);

  })
}

export function chooseTicket (obj) {

  const container = el('div.choose__container');

  if (obj.complex) {

   const eid = obj.complex.eid;
   const sid = obj.complex.sid;
   const hid = obj.complex.hid;

   let idsArr = [];
    let sidsArr = [];

    
    function openComplexEvent () {
      if (obj.complex.inc_sessions && obj.complex.inc_sessions !== null) {
        return openEvent({eid: eid, sid: sid, ids: idsArr, hid: hid, sids: sidsArr}).then(res => {
          return res;
        });
      }
       else {
        return openEvent({ eid: eid, sid: sid, hid: hid,ids: idsArr}).then(res =>  {
          return res;
        });
      }
    }

   openComplexEvent().then(res => {
    const infoDiv =  infoBlock(res);
    container.append(infoDiv);
    const checkBox = chechboxBlock(obj.complex);
    container.append(checkBox);
    createYandexMap(res.hall[0].theater_address);
    const allCheckBox = Array.from($(checkBox).find('input'));
   

    allCheckBox.forEach(el => {
      if (!$(el).prop('disabled')) {
       if ($(el).prop('checked')) {
         let ids = $(el).attr('ids');
         let sids = $(el).attr('sids');
         idsArr.push(ids);
         sidsArr.push(sids);
       }
      }
 
      el.addEventListener('change', (e) => {
       idsArr = [];
       sidsArr = [];
       allCheckBox.forEach(element => {
         if (!$(element).prop('disabled')) {
           if ($(element).prop('checked')) {
             let ids = $(element).attr('ids');
             let sids = $(element).attr('sids');
             idsArr.push(ids);
             sidsArr.push(sids);
           }
         }
       })
       openComplexEvent ()
      });
    });

    // все вывела теперь нужно отобразить тарифы


   });
  }

  if (obj.event) {
    const infoDiv =  infoBlock(obj.event)
    container.append(infoDiv);
    createYandexMap(obj.event.hall[0].theater_address);
    getTarif(obj.event)
  }



  return container;
}