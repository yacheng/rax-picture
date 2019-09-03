Component({
  props: {
    className: '',
    style: '',
    source: {
      uri: ''
    },
    resizeMode: 'contain',
    lazyload: false,
    onClick: e => {},
    onLoad: e => {},
    onError: e => {}
  }
});