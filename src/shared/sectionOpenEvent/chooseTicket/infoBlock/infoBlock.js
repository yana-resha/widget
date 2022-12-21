import './infoBlock.scss';
import $ from 'jquery';
import {el} from 'redom';
import { langName } from '../../../..';
import ymaps from 'ymaps';

export function infoBlock (obj) {
  const div = el('div.info-block');

  const infoTitle = el('div.info-block-title', `${obj.session.name}`);
  const infoDesc = el('div.info-desc');
  infoDesc.innerHTML = obj.session.short_description;
  const ageDesc = el('div.age-desc', `${langName.ageCategory}: ${obj.session.age_category}`);
  

  
  div.append(infoTitle, infoDesc, ageDesc);
  obj.hall.forEach(element => {
    
    const divHall = el('div.info-hall', `${element.theater_name}`);

    div.append(divHall);

    const divAddress = el('div.info-hall', `${element.theater_address}`);
    div.append(divAddress)
  });

  const mapContainer = el('div.container-map#map');
  div.append(mapContainer);

  // createYandexMap ()

  
  

  return div;
}