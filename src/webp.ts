/**
 * lossy : Lossy compression
 * lossless : lossless compression
 * alpha : example png
 * animation : example gif
 */

import { isWeex, isMiniApp } from "universal-env";

const typeObj = {
  lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
  lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
  alpha:
    "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
  animation:
    "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
};
let isIOS: boolean;
if (!isWeex && !window.__isSSR) {
  isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

function isSupportTest(callback: (isSupport: boolean) => void, type: string) {
  if ("function" !== typeof callback) return;
  const img = new Image();
  img.onload = function() {
    let is = img.width > 0 && img.height > 0;
    setLocalStorage(is, type);
    callback(is);
  };
  img.onerror = function() {
    setLocalStorage(false, type);
    callback(false);
  };
  img.src = "data:image/webp;base64," + typeObj[type];
}

function setLocalStorage(isSupport: boolean, type: string) {
  if (
    window.localStorage &&
    typeof window.localStorage.setItem === "function"
  ) {
    try {
      window.localStorage.setItem("webpsupport-" + type, isSupport + "");
    } catch (e) {
      console.warn(e);
    }
  }
}

export function isSupport(type = "lossy") {
  return new Promise<boolean>(resolve => {
    if (isWeex || isMiniApp || window.__isSSR) {
      resolve(true);
    } else if (
      window.navigator.userAgent.match(/windows|win32/i) ||
      (isIOS && window.navigator.userAgent.match(/UCBrowser/i))
    ) {
      resolve(false);
    } else if (window.chrome || window.opera) {
      resolve(true);
    } else {
      let val =
        window.localStorage &&
        window.localStorage.getItem("webpsupport-" + type);
      if (val) {
        resolve(val == "true");
      } else {
        isSupportTest(resolve, type);
      }
    }
  });
}
