import { el } from "redom";
import $ from 'jquery';
import { container } from "../container/container";
import { detailsBlock } from "./detailsBlock/detailsBlock";
import { sessionsBlock } from "./sessionsBlock/sessionsBlock";
import { askEvents } from "../hooks/askEvents";
import { chooseTicket } from "./chooseTicket/chooseTicket";


export function sectionOpenEvent (stringEvent = '', arrDetails = {}, arr = {}) {
  const section = $('.open-event')[0];
  const cont = container();
  section.innerHTML = '';
  section.style.paddingTop = '80px';
  section.style.paddingBottom = '80px';

  let detail;
  let objForDetailBlock = {
    text: arrDetails,
  }

  if (arr.infoBLocks) objForDetailBlock.block = arr.infoBLocks;

  if (stringEvent === 'getEventInfo') {
    detail =  detailsBlock(objForDetailBlock)
    cont.append(detail);
    const sessions = sessionsBlock(arr)
    cont.append(sessions)
  }

  if (stringEvent === 'openEvent') {
    console.log(stringEvent)
    const choose__container = chooseTicket(arr);
    cont.append(choose__container);
  }

  section.append(cont)
}

