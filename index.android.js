import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import SplitBillNavigator from './src/screens/SplitBillNavigator';

const SplitTheBill = StackNavigator({
  Main: { screen: MainScreen }, // Main entry screen
  Split: { screen: SplitBillNavigator }, // Screen for inputs & split bill
});

AppRegistry.registerComponent('SplitTheBill', () => SplitTheBill);
