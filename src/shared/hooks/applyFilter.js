
import { filterObj } from '../..';
import { getAfisha } from '../api';
import { createAfishaList } from '../createSection/createAfishaList';

export function applyFilter () {

  getAfisha(filterObj).then(arr =>  {
    createAfishaList (arr)
  })
}