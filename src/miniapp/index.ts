"use strict";
import fmtEvent from './fmtEvent';

Component({
  data: {},
  props: {
    className: "",
    style: "",
    source: {
      uri: ""
    },
    onClick: function onClick() {}
  },
  didMount: function didMount() {},
  methods: {
    onClick: function onClick(e) {
      var event = fmtEvent(this.props, e);
      this.props.onClick(event);
    }
  }
});
