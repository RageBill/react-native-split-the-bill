import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Text,
  Icon
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

export default class SplitBill extends Component {
  
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Icon name='dollar-bill' color='steelblue' type='foundation' containerStyle={{ paddingRight: 10 }}/>,
    headerTintColor: 'steelblue'
  })

  render(){
  	return(
  	  <View style={styles.container}>
        <Text>Splitting the Bill here!</Text>
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
    backgroundColor: 'white',
  }
});