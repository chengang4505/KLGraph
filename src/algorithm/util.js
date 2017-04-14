/**
 * Created by chengang on 17-2-21.
 */

var util = {};

util.getArrayIndexer = function (arr,n,m) {
  return function (x,y) {
      return arr[n*x+m*y];
  }
};

export default util;