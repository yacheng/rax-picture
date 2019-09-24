import {
  createElement,
  ForwardRefExoticComponent,
  forwardRef,
  useState,
  useCallback,
  useEffect,
  memo
} from 'rax';
import Image from 'rax-image';
import optimizer from './optimizer';
import { PictureProps } from './types';
import { getQualitySuffix } from './uitl';
import { isSupport } from './webp';
import { isWeex } from 'universal-env';

function isSupportWebP() {
  return Promise.all([isSupport(), isSupport('alpha')]).then(result => {
    return result.every(r => r);
  });
}

const Picture: ForwardRefExoticComponent<PictureProps> = forwardRef(
  (props, ref) => {
    const {
      className,
      style,
      width,
      height,
      resizeMode = 'contain',
      source,
      placeholder = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
      autoRemoveScheme = true,
      autoReplaceDomain = true,
      autoScaling = true,
      autoWebp = true,
      ignoreGif = true,
      autoCompress = true,
      highQuality = true,
      compressSuffix = ['Q75', 'Q50'],
      lazyload = false,
      autoPixelRatio = true
    } = props;
    const [uri, setUri] = useState(source.uri);
    const [visible, setVisible] = useState(false);
    let { width: sWidth, height: sHeight } = style || {};
    if (!sHeight && sWidth && width && height) {
      sHeight = parseInt(height / (width / parseInt(sWidth + '', 10)) + '', 10);
    }

    useEffect(() => {
      if (source.uri) {
        if (isWeex && !lazyload && !visible) {
          setVisible(true);
        } else {
          isSupportWebP().then(supported => {
            if (autoPixelRatio && window.devicePixelRatio > 1) {
              // devicePixelRatio >= 2 for web
              if (typeof sWidth === 'string' && sWidth.indexOf('rem') > -1) {
                sWidth = parseInt(sWidth.split('rem')[0]) * 2 + 'rem';
              }
            }
            setUri(
              optimizer(source.uri, {
                ignoreGif: ignoreGif,
                ignorePng: true,
                removeScheme: autoRemoveScheme,
                replaceDomain: autoReplaceDomain,
                scalingWidth: autoScaling ? parseInt(sWidth + '', 10) : 0,
                webp: autoWebp && supported,
                compressSuffix: autoCompress
                  ? getQualitySuffix(highQuality, compressSuffix)
                  : ''
              })
            );
            if (!lazyload && !visible) {
              setVisible(true);
            }
          });
        }
      }
    }, [source.uri]);

    const handleAppear = useCallback(() => {
      if (lazyload) {
        setVisible(true);
      }
    }, [source.uri]);

    const commonStyle = {
      height: sHeight,
      ...style,
      resizeMode
    };

    return (
      <Image
        ref={ref}
        className={className}
        style={commonStyle}
        source={{ uri: visible ? uri : placeholder }}
        placeholder={placeholder}
        onAppear={handleAppear}
      />
    );
  }
);

export default memo(Picture);
