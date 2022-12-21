import { startIframe } from "./startIframe";
import $ from 'jquery';
import { afishaReplaceBtn } from "../../afishaReplaceBtn/afishaReplaceBtn";
import { el } from "redom";
import { getItem } from "../localStorage";
import { container } from "../container/container";
import { device } from "../../index";
import {storageKeyLang} from '../../index'

export function createWindow (array) {

  const langItem = getItem(storageKeyLang)

  
  if (device.window === 'iframe') {
    array ?  startIframe(array) : startIframe();
   
  }
  const cont = container();
  const title = el('h1.afisha__title', `${langItem.afishaTitle}`);
  const afishaSection = $('.afisha')[0];
  afishaSection.append(cont);
  cont.append(title);
  let replaceListBtn;
  
  if (device.list === 'afishaCalendarList') {
    replaceListBtn = afishaReplaceBtn('calendar-afisha-list', 'calendar-block', 'calendar-list');
  }

  if (device.list === 'afishaList') {
    replaceListBtn = afishaReplaceBtn('afisha__list', 'afisha-block', 'afisha-list');
  }
  
  cont.append(title)

  if (replaceListBtn) {
    cont.append(replaceListBtn);
  }
  const listCont = el('div.list-cont');
  cont.append(listCont);

}
