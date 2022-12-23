import './busket.scss';
import {el} from 'redom';
import $ from 'jquery';

export function busket () {
 const div = el('div.busket-container');
 const sum = el('div.busket-sum');

 const ticketList = el('ul.list-no-marker.ticket-container');


 const btn = el('button.busket-btn', 'Оформить');
 div.append(ticketList, sum, btn);
 return div;
}