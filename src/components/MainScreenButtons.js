import React, { Component } from 'react';
import {
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
import colors from 'Colors';

export default class MainScreenButtons extends Component {

  render(){

    const {navigate} = this.props.navigation;

    return(
      <View style={this.props.style}>
          <Button
            raised
            borderRadius={100}
            fontSize={20}
            icon={{name: 'dollar', size: 30, color: colors.primary1, type: 'foundation'}}
            buttonStyle={{backgroundColor: colors.secondary1}}
            textStyle={{textAlign: 'center', color: colors.primary1 }}
            title={'Calculate'}
            containerViewStyle={{borderRadius: 20, width: '70%'}}
            onPress={() => navigate('Split')}
          />
          <Button
            raised
            borderRadius={100}
            fontSize={20}
            icon={{name: 'exit-to-app', size: 30, color: colors.primary1 }}
            buttonStyle={{backgroundColor: colors.secondary2}}
            textStyle={{textAlign: 'center', color: colors.primary1 }}
            title={'Exit App'}
            containerViewStyle={{borderRadius: 20, width: '70%'}}
            onPress={() => Alert.alert(
              'Exit Application',
              'Are you sure you want to exit?',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Confirm', onPress: () => RNExitApp.exitApp()}
              ],
            {cancelable: true}
            )}
          />
        </View>
    )
  }
}