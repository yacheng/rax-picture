import { createElement, forwardRef, Ref } from 'rax';
import { isWeex } from 'universal-env';
import { PictureProps } from './types';
import PicWeex from './picture.weex';
import PicWeb from './picture.web';

export default forwardRef((props: PictureProps, ref: Ref<HTMLImageElement>) => {
  if (isWeex) {
    return <PicWeex {...props} ref={ref} />;
  } else {
    return <PicWeb {...props} ref={ref} />;
  }
});
