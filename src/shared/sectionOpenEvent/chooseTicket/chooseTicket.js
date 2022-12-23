import './chooseTicket.scss';
import $ from 'jquery';
import { el } from 'redom';
import { chechboxBlock } from './checkboxBlock/checkboxBlock';
import { openEvent } from '../../api';
import { infoBlock } from './infoBlock/infoBlock';
import { createYandexMap } from '../../hooks/createYandexMap';
import { busket } from '../../busket/busket';
import { createTicketArr } from '../../busket/createTicketArr';


function getTarif(d) {
 
  const busketBlock = busket();
  const tarifContainer = el('div.tarif-container', {
    name: d.session.name,
  });

  if (d.hall[0].events_type_id == '4' || d.hall[0].events_type_id == '6') {

  } else {

    let levels = d.r;
    let prices = [];//преобразовываем в удобный массив
    let price_color = [];
    var prices_gr = [];
    console.log(d)
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
    var min  = 0; //минимальное количество билетов 
  
  
    levels.forEach(element => {
  
      sids[element.ei_id] = element.sid;
      if(parseInt(element.tq_free < min || !min)) min = parseInt(element.tq_free);
      if (d.hall[0].show != 'Y') {
        let levelBlock = el('div.tarif-level');
        let countPlace = el('div.level-free-place', `Свободных мест: ${element.tq_free}`);
        levelBlock.append(countPlace);
        tarifContainer.append(levelBlock);
        const partTarifContainer = el('div.part-tarif-container');
        if (element.tq_free && element.tq_free > 0) {
          for (let i in prices) {
            let tarif = i;
            if (tarif == element.gr) {
              for (let j in prices[tarif]) {
                let sort = j;
                for (let tid in prices[tarif][sort]) {
                  let tarifObj = prices[tarif][sort][tid];
                  
                  let partTarif = el('div.part-tarif');
                  partTarif.setAttribute('name', tarifObj.tname);
                  const tarifName = el('div.part-tarif-title', `${tarifObj.tname}`);
                  partTarif.append(tarifName);
                  partTarifContainer.append(partTarif);
                  const price = tarifObj.price / 100;
                  
                  const tarifContent = el('div.tarif-content-block');
                  const priceBlock = el('div.price-tarif', `${price} руб.`);
                  priceBlock.setAttribute('price', price);
                 
                  const payBlock = el('div.tarif-pay-block');
                  const btnAdd = el('button.btn-add', '+', {
                    onclick () {
                      countInput.value = parseInt(countInput.value) + 1;
                      if (countInput.value > 0) {
                        btnRemove.disabled = false;
                      }

                    }
                  });
                  const btnRemove = el('button.btn-add', '-', {
                    disabled: true,
                    onclick () {
                      if (countInput.value > 0) {
                        countInput.value = parseInt(countInput.value) - 1;
                        if (countInput.value == 0) btnRemove.disabled = true;
                      } 

                    }
                  });
                  const countInput = el('input.tarif-pay-count', {
                    type: 'number',
                    value: 0,
                    readOnly: 'ReadOnly',
                    name: "cval" + `[${element.tid}]` + `[${tarifObj.id}]` + `[${tid}]`,
                  });
                  
                  createTicketArr([btnAdd, btnRemove]);
                  tarifContent.append(priceBlock, payBlock);
                  partTarif.append(tarifContent);
                  payBlock.append(btnRemove, countInput, btnAdd);
                  levelBlock.append(partTarifContainer);
                  
                }
              }
            }
          }
        }
      }
    })
  }

  const busket1 = $('.busket-container')[0];
  if (busket1) {
    busket1.remove();
  }
  document.body.append(busketBlock);
  return tarifContainer;
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
    console.log(container)
    container.innerHTML = '';
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
    const infoDiv =  infoBlock(obj.event);
    container.append(infoDiv);
    createYandexMap(obj.event.hall[0].theater_address);
    const tarifBlock = getTarif(obj.event);
    container.append(tarifBlock);
  }

  return container;
}