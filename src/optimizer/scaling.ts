import { isWeb, isMiniApp } from 'universal-env';

let width = 0;
if (isWeb) {
  width = window.screen.width && window.screen.width;
  if (!window.__isSSR) {
    width = document.documentElement.clientWidth / 750 * width;
  }
} else if (isMiniApp) {
  const systemInfo = my.getSystemInfoSync();
  width = systemInfo.screenWidth;
}

const scalingWidth = [
  // use width
  110,
  140,
  150,
  170,
  220,
  230,
  240,
  290,
  300,
  360,
  450,
  570,
  580,
  620,
  790
];
const visualStandard = 750;

function find(c: number, arr: number[]) {
  let min = 1000;
  let result = c;
  let fKey = 0;
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    let abs = Math.abs(num - c);
    if (abs === 0) {
      result = num;
      fKey = i;
      return false;
    }
    if (min > abs) {
      min = abs;
      result = num;
      fKey = i;
    }
  }
  if (c > result && arr[fKey + 1]) {
    result = arr[fKey + 1];
  }
  if (arr.indexOf(result) > -1) {
    return result;
  }
  return false;
}

/**
 * @param {String | Number} sWidth
 * @param {any} isOSSImg
 * @returns {String}
 */
export default function(sWidth: string | number, isOSSImg: any): string {
  let xWidth = 0;
  let scaling = 1;
  if (width) {
    if (typeof sWidth === 'string') {
      // process rem & rpx
      xWidth = parseFloat(sWidth);
      if (sWidth.indexOf('rem') > -1 || sWidth.indexOf('rpx') > -1) {
        scaling = visualStandard / width;
      }
    } else {
      // isNum
      xWidth = sWidth;
      scaling = visualStandard / width;
    }
  }

  const newWidth = find(Math.floor(xWidth / scaling), scalingWidth);
  return newWidth ? isOSSImg ? `_${newWidth}w` : `${newWidth}x10000` : '';
}
