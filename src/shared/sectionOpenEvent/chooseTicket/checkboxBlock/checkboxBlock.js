import './checkboxBlock.scss';
import { el } from 'redom';
import $ from 'jquery'

export function chechboxBlock (obj) {
  const div = el('div.checkbox-block');

  let inc;
  obj.inc_sessions && obj.inc_sessions !== null ? inc = obj.inc_sessions : inc = obj.inc;
  
  let id = 0;
  obj.req.forEach(j => {
    id += 1;
    const label = el('label', `${j.name}`, {for: `${id}`});
    const checkInput = el(`input.custom-checkbox#${id}`, {
      type: 'checkbox',
      name: `${id}`,
      sids:  `${j.ei_sid}`,
      ids: j.event_id,
    });

    if (j.req == 'Y') {
      $(checkInput).prop("checked", true)
      $(checkInput).prop("disabled", true)
    }

    if (j.req != 'Y') {
      j.default == 'Y' ? $(checkInput).prop("checked", true) : $(checkInput).prop("checked", false);
      $(checkInput).prop("disabled", false)
    }
    
    const checkContainer = el('div.checkbox-container', [checkInput, label]);
    if (inc.hasOwnProperty(j.event_id)) {
      div.append(checkContainer);
    }
    if (!inc.hasOwnProperty(j.event_id) && j.req == 'Y') {
      label.textContent =+ ' Мероприятие недоступно';
      div.append(checkContainer);
    }
    inc.forEach(element => {
      if (element !== null) {
        if (element.ei_sid === j.ei_sid && obj.inc_sessions) {
          label.textContent = `${j.name} ${element.se_start_date}`;
         };
         if (element.ei_sid === j.ei_sid && !obj.inc_sessions) {
           label.textContent = `${j.name}`;
         };
      }
    })
  })

  return div;
}