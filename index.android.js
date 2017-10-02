import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import MainScreen from './src/screens/MainScreen';
import SplitBill from './src/screens/SplitBill';
import { StackNavigator } from 'react-navigation';

const SplitTheBill = StackNavigator({
  Main: { screen: MainScreen },
  Split: { screen: SplitBill },
});

AppRegistry.registerComponent('SplitTheBill', () => SplitTheBill);
