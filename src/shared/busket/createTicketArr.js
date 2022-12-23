import $ from 'jquery';
import { setTicket, getTicket } from '../localStorage';
import {el} from 'redom';


export function createTicketArr (btnsArr) {
  
  btnsArr.forEach(btn => {
    
    btn.addEventListener('click', (e) => {
      let ticketArr = [];
      const busket = $('.busket-container')[0];
      const busketSum = $(busket).find('.busket-sum')[0];
      const ticketList = $(busket).find('.ticket-container')[0];

      const countInput = Array.from($('.tarif-pay-count'));
      countInput.forEach(input => {
        const newObj = {};
        const mainCont = $(input).closest('.tarif-container')[0];
        newObj.name = $(mainCont).attr('name');
        const tarif = $(input).closest('.part-tarif');
        const tarifName = $(tarif).attr('name');
        newObj.count = parseInt(input.value);
        newObj.tname = tarifName;
        const tarifPrice = $(tarif).find('.price-tarif')[0];
        const price = $(tarifPrice).attr('price');
        newObj.tprice = price;
        newObj.tsum = price * newObj.count;
        const data = $(input).attr('name');
        newObj.data = data;
        ticketArr.push(newObj);
      })

      ticketArr = ticketArr.filter(obj => obj.count > 0);
      setTicket(ticketArr);
      const allTicket = getTicket();
      if (allTicket.ticket.length > 0) {
        busket.classList.add('open');
      } else {
        busket.classList.remove('open');
      }
      ticketList.innerHTML = '';
      busketSum.textContent = `Общая сумма: ${allTicket.sum} руб.`;

      allTicket.ticket.forEach(elem => {
        const li = el('li.ticket-list-part');
        const name = el('div.ticket-list-part-title', `${elem.name}`);
        const tarifName = el('div.ticket-list-part-tname', `тариф: ${elem.tname}`);
        const count = el('div.ticket-list-part-count', `кол-во: ${elem.count}`);
        const sum = el('div.ticket-list-part-count', `сумма: ${elem.tsum} руб`);

        li.append(name, tarifName, count, sum);
        ticketList.append(li);
      })

      
    })
  })
}

