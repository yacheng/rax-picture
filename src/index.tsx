import { createElement } from 'rax';
import { isWeex } from 'universal-env';
import { PictureProps } from './types';
import PicWeex from './picture.weex';
import PicWeb from './picture.web';

export default (props: PictureProps) => {
  if (isWeex) {
    return <PicWeex {...props} />;
  } else {
    return <PicWeb {...props} />;
  }
};
