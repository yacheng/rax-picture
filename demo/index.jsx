/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render } from 'rax';
import DU from 'driver-universal';
import Picture from '../src/index';
import './index.css';

const App = () => {
  return (
    <Picture
      className="coin"
      source={{
        uri: 'https://gw.alicdn.com/tfs/TB1bBD0zCzqK1RjSZFpXXakSXXa-68-67.png',
      }}
    />
  );
};
render(<App />, document.body, { driver: DU });
