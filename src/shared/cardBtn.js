import { el } from "redom";
import { langName } from "..";
import { getEventInfo, openEvent, getAfisha } from "./api";
import $ from 'jquery'
import { sectionOpenEvent } from "./sectionOpenEvent/sectionOpenEvent";
import Navigo from "navigo";
import { smoothScroll } from "./hooks/smoothScroll";
import { filterObj } from "..";
import { createDataForFilterObj } from "./hooks/createDataForFilterObj";
import { calendarPeriod } from "./hooks/calendarPeriod";
import { askEvents } from "./hooks/askEvents";
const router = new Navigo('/');


export function cardBtn (obj) {
  let cardBtn;
  const section = $('.open-event')[0];
  (obj.all_times !== undefined && obj.preview_text.length === 0 &&  obj.all_times.length === 1) || (obj.preview_text.length === 0 &&  obj.sid.length === 1) ? cardBtn = el('button.card__btn', `${langName.payBtn}`, {
    'eid': obj.eid,
    'sid': obj.sid,
    onclick (e) {
      const CMD = 'openEvent';
      const eid = $(e.target).attr('eid');
      const sid = $(e.target).attr('sid');
      const loadObj = {
        eid: eid,
        sid: sid,
        hid: obj.hall_id,
      }
      
        
        section.innerHTML = 'Подождите идет загрузка';
        askEvents(loadObj)
        .then(res => {
          section.innerHTML = '';
          const createSection = sectionOpenEvent (CMD, {}, res);
          smoothScroll(section, 180);
        })
    }
  }) :
   (obj.all_times !== undefined && obj.preview_text.length === 0 &&  obj.all_times.length > 1) || (obj.preview_text.length === 0 &&  obj.sid.length > 1) ? cardBtn = el('button.card__btn', `${langName.goSessionBtn}`, {
    'eid': obj.eid,
    onclick() {
      const date = calendarPeriod();
      getAfisha ({eid: obj.eid});
      smoothScroll(section, 180);
    }
  }):
  cardBtn = el('button.card__btn', `${langName.moreBtn}`, {
    'eid': obj.eid,
    'themes': obj.theme_id,
    'sid': '0',
    onclick () {
      Array.from($('.card__btn')).forEach(el => $(el).removeAttr('event'))
      $(cardBtn).attr('event', 'open')
      const date = calendarPeriod();
      section.innerHTML = 'подождите идет загрузка';
      const CMD = 'getEventInfo';
      getEventInfo ({eid: obj.eid}).then(res => {
        getAfisha ({eid: obj.eid, themes: obj.theme_id, ...date, sid: "0"}).then(afishares => {
          afishares.eid = obj.eid;
          afishares.sid = obj.sid;
          afishares.hid = obj.hall_id;
          afishares.themes = obj.theme_id;
          const createSection = sectionOpenEvent(CMD, res, afishares);
          smoothScroll(section, 180);
        })
      })
    }
  });
  return cardBtn
}

