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
  },
  methods: {
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
