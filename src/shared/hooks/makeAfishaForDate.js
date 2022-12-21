


export function makeAfishaForDate (arr) {
  let eidArr = arr;
  let finallArr = [];
  if (arr && arr.length > 0) {
    eidArr = eidArr.map(e => {
      return e.eid
    })
    let uniqEid = [...new Set(eidArr)];
    uniqEid.forEach(еlement => {
      let eventArr = [];
      arr.forEach(el => {
        
        if (el.eid === еlement) {
          eventArr.push(el);
        }
      })
      
      if (eventArr.length > 1) {
        let filterDate =  eventArr.map(el =>  {
          return el.session_date
        });
        let uniqFilterDate = [...new Set(filterDate)]
        let eventArrForDate = [];
        uniqFilterDate.forEach(date => {
          let times = [];
          let sid = [];
          let rangeTimes = [];
          let newEvent = {};
          eventArr.forEach(event => {
            if (date === event.session_date) {
              newEvent = {...event};
              sid.push(event.sid);
              times.push(event.session_time);
              
              rangeTimes.push(new Date(event.start_datetime));
            
              
              newEvent.all_times = times;
              if (rangeTimes.length > 1) {
                let minDate = new Date(Math.min.apply(null,rangeTimes)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                let maxDate = new Date(Math.max.apply(null,rangeTimes)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
              
                let minMaxArr = [minDate, maxDate];
                newEvent.range_times =  minMaxArr;
              }
            }
          })
          newEvent.sid = sid;
          
          eventArrForDate.push(newEvent)
        })
        finallArr = [...finallArr, ...eventArrForDate];
      }
      if (eventArr.length === 1) {
        eventArr[0].all_times = [eventArr[0].session_time];
        finallArr.push(eventArr[0])
      }
    })
  }

  finallArr.forEach(el => {
    let from = el.session_date.split(".")
    let date = "" + from[2] + "." + from[1] + "." + from[0];
    el.session_date = date;
  })
  
  finallArr = finallArr.sort((a,b) => {
    let dateА = new Date(a.session_date);
    let dateB = new Date(b.session_date);
    return dateА - dateB
  })

  return finallArr
}