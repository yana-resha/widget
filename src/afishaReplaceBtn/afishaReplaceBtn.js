import './afishaReplaceBtn.scss'
import { el } from 'redom'
import $ from 'jquery'

export function afishaReplaceBtn (classList, classList1, classList2) {
  const buttonContainer = el('div.afishaReplace-container');
  const afishaReplaceBtn = el('button.afishaReplace-btn', {
    onclick() {
     const list =  $(`.${classList}`)[0];
     list.classList.toggle(`${classList1}`);
     list.classList.toggle(`${classList2}`);
    }
  });
  afishaReplaceBtn.innerHTML = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 56 56" style="enable-background:new 0 0 56 56;" xml:space="preserve"><g><path d="M8,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,40,8,40z"/><path d="M28,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,40,28,40z"/><path d="M48,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S52.411,40,48,40z"/><path d="M8,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,20,8,20z"/><path d="M28,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,20,28,20z"/><path d="M48,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S52.411,20,48,20z"/><path d="M8,0C3.589,0,0,3.589,0,8s3.589,8,8,8s8-3.589,8-8S12.411,0,8,0z"/><path d="M28,0c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,0,28,0z"/><path d="M48,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S43.589,16,48,16z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
  buttonContainer.append(afishaReplaceBtn)
  return buttonContainer
}