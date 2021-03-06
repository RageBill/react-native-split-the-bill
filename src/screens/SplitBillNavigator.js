import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator } from 'react-navigation';
import SplitBillScreen from './SplitBillScreen';
import ServiceChargeScreen from './ServiceChargeScreen';
import colors from 'Colors';

const SplitBillNavigator = TabNavigator({
  SplitBill: { screen: SplitBillScreen },
  ServiceCharge: { screen: ServiceChargeScreen },
},
{
  tabBarOptions: {
    tabStyle: {
      backgroundColor: colors.primary3,
    },
    labelStyle: {
      color: colors.primary1,
    }
  }
});

export default SplitBillNavigator;