import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import SplitInputs from '../components/SplitInputs'
import { StackNavigator } from 'react-navigation';

export default class SplitBill extends Component {
  
  static navigationOptions = ({navigation}) => ({
    title: 'Splitting The Bill',
    headerRight: <Icon name='dollar-bill' color='steelblue' type='foundation' containerStyle={{ paddingRight: 10 }}/>,
    headerTintColor: 'steelblue'
  })

  render(){
  	return(
  	  <View style={styles.container}>
        <SplitInputs/>
        <View style={{ flex: 4 }}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#5696BC',
  }
});