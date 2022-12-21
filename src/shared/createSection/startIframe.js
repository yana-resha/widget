import {Header} from '../header/header'

export function startIframe (arr) {
  
  const header = Header(arr);
  document.body.prepend(header);
}