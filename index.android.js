import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import MainScene from './src/scenes/MainScene'

export default class SplitTheBill extends Component {
  render() {
    return (
      <MainScene/>
    );
  }
}

AppRegistry.registerComponent('SplitTheBill', () => SplitTheBill);
