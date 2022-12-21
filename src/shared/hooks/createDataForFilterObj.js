import { filterObj } from "../..";

export function createDataForFilterObj (dataString) {
  if (dataString === '0') filterObj.date = '';
  if (dataString.includes('-')) {
    const dataArr = dataString.split('-');
    
    filterObj.date_from = dataArr[0];
    filterObj.date_to = dataArr[1];
    filterObj.date = '';
  };

  
  if (dataString.includes('-') === false && dataString.length > 0) {

    filterObj.date = dataString; 
    filterObj.date_from = '';
    filterObj.date_to = '';
  };
}
