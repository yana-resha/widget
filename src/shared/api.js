import { getItem } from "./localStorage"

export function newuserOnlyStart (token) {
  return fetch(`https://widget.telegreen.ru/api/data/index.php`, {
  // mode: 'no-cors',
  method: 'POST',
  headers: { 
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({"lang":"ru","CMD":"newuser", onlystart: 1})
  })
  .then(res => res.json())
  .then(obj => {
    return {
      sidhash: obj.sidhash,
      themes: obj.themes,
      hash: obj.hash,
      promocode: obj.promocode,
      promocode_id: obj.promocode_id,
    }
  })
  .catch(err => console.log(err))
}

export function newuser(filter) {
  return fetch(`https://widget.telegreen.ru/api/data/index.php`, {
  // mode: 'no-cors',
  method: 'POST',
  headers: { 
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${filter.token}`,
  },
  body: JSON.stringify({"lang":"ru","CMD":"newuser", onlystart: 1})
  })
  .then(res => res.json())
  .then(obj => {
    return {
      sidhash: obj.sidhash,
      themes: obj.themes,
      hash: obj.hash,
      promocode: obj.promocode,
      promocode_id: obj.promocode_id,
    }
  })
  .catch(err => console.log(err))
}




// получить список всех сеансов по eid
export function getAfisha (filter) {
  
  const body = Object.assign({"CMD":"events"}, filter); 

  const sidhash = getItem('sidhash');
  return fetch(`https://widget.telegreen.ru/api/data/index.php`, {
  method: 'POST',
  headers: { 
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${filter.token}`,
  sidhash: sidhash,
  },
  body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(obj => {
    if(obj.error) throw new Error(obj.error);
    return obj;
  })
  .catch(err => {
    throw new Error('что то пошло не так')
  })
}


// открывает уже конкретный сеанс
export function openEvent (filter) {
  const body = Object.assign({"CMD":"openEvent"}, filter);
  console.log(body) 
  const sidhash = getItem('sidhash');
  return fetch(`https://widget.telegreen.ru/api/data/index.php`, {
  method: 'POST',
  headers: { 
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${filter.token}`,
  sidhash: sidhash,
  },
  body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(obj => {

    if(obj.error) throw new Error(obj.error);
    return obj
    // if (obj.r) return obj.r;
    // if (!obj.r) return [];
  })
  .catch(err => {
    throw new Error('что то пошло не так')
  })
}


// комплексные билеты
export function loadComplex (filter) {
  const body = Object.assign({"CMD":"loadComplex", "hid": "0"}, filter); 
  console.log(body)
  const sidhash = getItem('sidhash');
  return fetch(`https://widget.telegreen.ru/api/data/index.php`, {
  method: 'POST',
  headers: { 
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${filter.token}`,
  sidhash: sidhash,
  },
  body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(obj => {
    // в obj будет ключ req с массивом он мне и нужен
    return obj
    // if (obj.r) return obj.r;
    // if (!obj.r) return [];
    // if(obj.error) throw new Error(obj.error);
  })
  .catch(err => {
    throw new Error('что то пошло не так')
  })
} 



// информация о все
export function getEventInfo (filter) {
  const body = Object.assign({"CMD":"getEventInfo"}, filter); 
  const sidhash = getItem('sidhash');
  return fetch(`https://widget.telegreen.ru/api/data/index.php`, {
  method: 'POST',
  headers: { 
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${filter.token}`,
  sidhash: sidhash,
  },
  body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(obj => {
    // в obj будет ключ req с массивом он мне и нужен
    if (obj.event) return obj.event;
    if (!obj.event) return [];
    if (obj.error) throw new Error(obj.error);
  })
  .catch(err => {
    throw new Error('что то пошло не так')
  })
} 

