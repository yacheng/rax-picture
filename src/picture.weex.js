import { createElement, Component, memo } from 'rax';
import Image from 'rax-image';

function Picture(props) {
  let {
    children,
    style = {},
    source = {},
    resizeMode,
    width,
    height,
    defaultHeight
  } = props;
  let styleWidth = style.width; // style width of picture
  let styleHeight = style.height; // style width of picture

  // according to the original height and width of the picture
  if (!styleHeight && styleWidth && width && height) {
    const pScaling = width / parseInt(styleWidth, 10);
    styleHeight = parseInt(height / pScaling, 10);
  }

  if (!styleHeight) {
    styleHeight = defaultHeight;

    if (!resizeMode) {
      // ensure that the picture can be displayed
      resizeMode = 'contain';
    }
  }

  let newStyle = Object.assign({
    height: styleHeight
  }, style);

  if (resizeMode) {
    newStyle.resizeMode = resizeMode;
  }

  return <Image {...this.props} source={source} style={newStyle}>
    {children}
  </Image>;
}

function shouldComponentUpdate(preProps, nextProps) {
  if (preProps.forceUpdate || preProps.children) {
    return true;
  }

  return preProps.source.uri !== nextProps.source.uri;
}

export default memo(Picture, shouldComponentUpdate);

