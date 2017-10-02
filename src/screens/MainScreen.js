import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import {
  Button,
  Text,
  Icon
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import RNExitApp from 'react-native-exit-app';

export default class MainScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Icon name='home' color='steelblue' containerStyle={{ paddingRight: 10 }}/>,
    headerTintColor: 'steelblue'
  })

  render(){
    const {navigate} = this.props.navigation;
  	return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text h1>Split The Bill</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            raised
            large
            borderRadius={100}
            fontSize={20}
            icon={{name: 'attach-money', size: 30}}
            buttonStyle={{backgroundColor: 'steelblue'}}
            textStyle={{textAlign: 'center'}}
            title={'Calculate & Pay'}
            containerViewStyle={{borderRadius: 20, width: '60%'}}
            onPress={() => navigate('Split')}
          />
          <Button
            raised
            large
            borderRadius={100}
            fontSize={20}
            icon={{name: 'exit-to-app', size: 30}}
            buttonStyle={{backgroundColor: 'steelblue'}}
            textStyle={{textAlign: 'center'}}
            title={'Exit App'}
            containerViewStyle={{borderRadius: 20, width: '60%'}}
            onPress={() => Alert.alert(
              'Exit Application',
              'Are you sure you want to exit?',
              [
                {text: 'Confirm', onPress: () => RNExitApp.exitApp()},
                {text: 'Cancel', style: 'cancel'}
              ],
            {cancelable: true}
            )}
          />
        </View>
	  </View>
	)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  }
});