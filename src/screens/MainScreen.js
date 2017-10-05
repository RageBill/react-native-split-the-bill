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

// Colors
const primary1 = '#FFFFFF'; // White
const primary2 = '#6296F9'; // Blue
const secondary1 = '#E91E63'; // Red
const secondary2 = '#303030'; // Grey

export default class MainScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Icon name='home' color={ primary1 } containerStyle={{ paddingRight: 10, backgroundColor: primary2 }}/>,
    headerTintColor: primary1,
    headerStyle: { backgroundColor: primary2 }
  })

  render(){
    const {navigate} = this.props.navigation;
  	return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection:'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '80%' }}>
            <Icon color={primary2} name='drink' size={30} type='entypo' />
            <Icon color={primary2} name='user' size={50} type='simple-line-icon' />
            <Icon color={primary2} name='food' size={40} type='material-community' />
            <Icon color={primary2} name='user-female' size={50} type='simple-line-icon' />
            <Icon color={primary2} name='food-variant' size={40} type='material-community' />
          </View>
          <View style={{ flexDirection:'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
            <Icon color={primary2} name='food-apple' size={30} type='material-community' />
            <Text h1 style={{ color: primary2 }}>Split The Bill</Text>
            <Icon color={primary2} name='food-croissant' size={40} type='material-community' />
          </View>
          <View style={{ flexDirection:'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '80%' }}>
            <Icon color={primary2} name='restaurant' size={30} />
            <Icon color={primary2} name='user-md' size={50} type='font-awesome' />
            <Icon color={primary2} name='food-fork-drink' size={40} type='material-community' />
            <Icon color={primary2} name='user-secret' size={50} type='font-awesome' />
            <Icon color={primary2} name='restaurant-menu' size={40} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            raised
            borderRadius={100}
            fontSize={20}
            icon={{name: 'dollar', size: 30, color: primary1, type: 'foundation'}}
            buttonStyle={{backgroundColor: secondary1}}
            textStyle={{textAlign: 'center', color: primary1 }}
            title={'Calculate'}
            containerViewStyle={{borderRadius: 20, width: '70%'}}
            onPress={() => navigate('Split')}
          />
          <Button
            raised
            borderRadius={100}
            fontSize={20}
            icon={{name: 'exit-to-app', size: 30, color: primary1 }}
            buttonStyle={{backgroundColor: secondary2}}
            textStyle={{textAlign: 'center', color: primary1 }}
            title={'Exit App'}
            containerViewStyle={{borderRadius: 20, width: '70%'}}
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
  // Outermost container
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary2,
  },
  // Container for the buttons
  buttonContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: primary1,
    width: '100%',
  },
  // Container for the title
  headerContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: primary1,
    width: '100%',
  }
});