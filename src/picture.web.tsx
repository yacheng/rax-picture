import {createElement, useState, memo} from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import optimizer from './optimizer/index';
import webp from './webp';

const toString = {}.toString;
const isArray = Array.isArray || function(arr) {
  return toString.call(arr) == '[object Array]';
};

let isSupportJPG = false;
let isSupportPNG = false;

webp.isSupport((_isSupportJPG) => {
  isSupportJPG = _isSupportJPG;
});

webp.isSupport((_isSupportPNG) => {
  isSupportPNG = _isSupportPNG;
}, 'alpha');

/**
 * @param  {String|Array} suffix
 * @return {[type]}        [description]
 */
function parseSuffix(suffix) {
  const result = [];
  let ret = [];

  if (typeof suffix === 'string') {
    ret = suffix.split(',');
  }

  if (isArray(suffix)) {
    ret = suffix;
  }

  if (ret && ret[0]) {
    result[0] = ret[0];
  }
  if (ret && ret[1]) {
    result[1] = ret[1];
  }

  return result;
}

/**
 * @param  {String|Array} suffix
 * @return {[type]}
 */
function getQualitySuffix(highQuality, suffix) {
  const _suffix = parseSuffix(suffix);
  return highQuality ? _suffix[0] : _suffix[1];
}

function Picture(props) {
  let {
    children,
    style = {},
    resizeMode,
    width,
    height,
    placeholder = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
    source = {
      uri: ''
    },
    autoRemoveScheme = true,
    autoReplaceDomain = true,
    autoScaling = true,
    autoWebp = true,
    ignoreGif = true,
    autoCompress = true,
    highQuality = true,
    compressSuffix = ['Q75', 'Q50'],
    defaultHeight = '750rem',
    lazyload = false,
    autoPixelRatio = true
  } = props;
  let {uri} = source;
  let nativeProps = props;

  const [visible, setVisible] = useState(false);


  let sWidth = style.width, // style width of picture
    sHeight = style.height; // style width of picture

  // according to the original height and width of the picture
  if (!sHeight && sWidth && width && height) {
    const pScaling = width / parseInt(sWidth, 10);
    sHeight = parseInt(height / pScaling + '', 10);
  }

  let newStyle = Object.assign({
    height: sHeight
  }, style);


  if (uri) {
    if (autoPixelRatio && window.devicePixelRatio > 1) { // devicePixelRatio >= 2 for web
      if (typeof sWidth === 'string' && sWidth.indexOf('rem') > -1) {
        sWidth = parseInt(sWidth.split('rem')[0]) * 2 + 'rem';
      }
    }

    uri = optimizer(uri, {
      ignoreGif: ignoreGif,
      ignorePng: true,
      removeScheme: autoRemoveScheme,
      replaceDomain: autoReplaceDomain,
      scalingWidth: autoScaling ? sWidth : 0,
      webp: autoWebp && (isSupportJPG && isSupportPNG),
      compressSuffix: autoCompress ? getQualitySuffix(highQuality, compressSuffix) : ''
    });
  }

  if (resizeMode) {
    newStyle.resizeMode = resizeMode;
  }

  let url = placeholder;
  if (lazyload) {
    nativeProps.onAppear = () => setVisible(true);
    if (visible) {
      url = uri;
    }
  } else {
    url = uri;
  }

  if (children) {
    return (
      <View
        {...nativeProps}
        data-once={true}
        style={{
          ...newStyle,
          ...{
            backgroundImage: 'url(' + url + ')',
            backgroundSize: resizeMode || 'cover',
            backgroundRepeat: 'no-repeat'
          },
          ...{
            backgroundPosition: resizeMode === 'cover' || resizeMode === 'contain' ? 'center' : null
          },
          ...{
            height: newStyle.height ? newStyle.height : defaultHeight
          }
        }}
      >
        {children}
      </View>
    );
  } else {
    return <Image
      {...nativeProps}
      data-once={true}
      source={{
        uri: url
      }}
      style={newStyle}
    />;
  }
}

function shouldComponentUpdate(preProps, nextProps,) {
  return !!preProps.children;
}

export default memo(Picture, shouldComponentUpdate);
