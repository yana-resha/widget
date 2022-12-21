export function makeAfishaArr (arr) {
  let uniqArr = arr;
  
  if (arr.length > 0) {
    uniqArr = uniqArr.map(e => e.eid)
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(obj=> arr[obj])
    .map(e => arr[e]);
    uniqArr.forEach(element => {
     let newArr = arr.filter(e => element.eid === e.eid);
     
     let sidArr = arr.filter(sid => sid.eid === element.eid).map(sid => sid.sid)
     element.sid = sidArr;

     if (newArr.length > 1) {
      let arrDate = newArr.map(el =>  {
        let from = el.start_date.split(".")
        let date = "" + from[2] + "." + from[1] + "." + from[0];
        return  new Date(date)
      });
      let minDate = new Date(Math.min.apply(null,arrDate)).toLocaleDateString();
      let maxDate = new Date(Math.max.apply(null,arrDate)).toLocaleDateString();
      element.date_to = minDate;
      element.date_from = maxDate;
      } 
    })
  }
  return uniqArr
}
