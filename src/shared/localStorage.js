export function setItem(key, value) {
  localStorage.setItem(`${key}`, JSON.stringify(value));
}

export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setTicket(arr) {
  let ticketObj = {};
  ticketObj.ticket = [];
  let sum = 0;
  arr.forEach(element => {
    sum += element.tsum;
    ticketObj.sum = sum;
    ticketObj.ticket.push(element);
  });
  localStorage.setItem(`ticket`, JSON.stringify(ticketObj));
}

export function getTicket() {
  return JSON.parse(localStorage.getItem('ticket'));
}