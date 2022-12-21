import { loadComplex, openEvent } from "../api";


export function askEvents (obj) {
  
  const objToApi = {
    eid: obj.eid,
    sid: obj.sid,
    hid: obj.hall_id,
  }

  if (obj.events_type_id == '4' || obj.events_type_id == '4') {
    return loadComplex(objToApi).then(res => {
      console.log(res)
      let obj = {complex: res};
      obj.complex.hid = objToApi.hid;
      return obj;
    })
    
    // return openEvent(objToApi).then(res => {
    //   return {event: res}
    // })
    // .then(async res => {
    //   const complexGroup = await loadComplex(objToApi);
    //   res.complex = complexGroup;
    //   return res;
    // })
  } else {
    return openEvent(objToApi).then(res => {
      console.log(res)
      return {event: res};
    })
  }



}