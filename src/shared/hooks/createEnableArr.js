
import moment from "moment";

export function createEnableArr(array) {
  let enableArr = [];
  if (array && array.length > 0) {
    array.forEach(el => {
      const enableDate = moment(el.start_datetime).locale('ru').format('DD.MM.YYYY');
      enableArr.push(enableDate);
   })
  }
  return enableArr;
}