import optimizer from '../optimizer';
import { getQualitySuffix } from '../uitl';

const placeholder =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

Component({
  data: {
    uri: ''
  },
  props: {
    className: '',
    style: '',
    source: {
      uri: ''
    },
    resizeMode: 'contain',
    lazyload: false,
    placeholder: placeholder,
    autoRemoveScheme: true,
    autoReplaceDomain: true,
    autoScaling: true,
    autoWebp: true,
    ignoreGif: true,
    autoCompress: true,
    highQuality: true,
    compressSuffix: ['Q75', 'Q50'],
    autoPixelRatio: true,
    onClick: e => {},
    onLoad: e => {},
    onError: e => {}
  },
  onInit() {
    this.optimize();
  },
  didMount() {
    if (!my.canIUse('component2')) {
      this.optimize();
    }
  },
  methods: {
    optimize() {
      const {
        ignoreGif,
        autoRemoveScheme,
        autoReplaceDomain,
        autoScaling,
        autoWebp,
        autoCompress,
        highQuality,
        compressSuffix,
        source
      } = this.props;
      let sWidth = 0;
      this.setData({
        uri: optimizer(source.uri, {
          ignoreGif: ignoreGif,
          ignorePng: true,
          removeScheme: autoRemoveScheme,
          replaceDomain: autoReplaceDomain,
          scalingWidth: autoScaling ? parseInt(sWidth + '', 10) : 0,
          webp: autoWebp,
          compressSuffix: autoCompress
            ? getQualitySuffix(highQuality, compressSuffix)
            : ''
        })
      });
    },
    onClick(e) {
      this.props.onClick(event);
    },
    onLoad(e) {
      this.props.onLoad(event);
    },
    onError(e) {
      this.props.onError(event);
    }
  }
});
