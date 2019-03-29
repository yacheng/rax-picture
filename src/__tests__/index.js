import {createElement, Component} from 'rax';
import renderer from 'rax-test-renderer';
import Pictrue from '../';

jest.mock('rax-image', () => {
    return function() {
        return <img src="" alt="" />;
    }
})

describe('Pictrue', () => {
  it('test typeof Pictrue', () => {
    expect(typeof Pictrue).toEqual('function');
  });
});


