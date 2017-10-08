import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import colors from 'Colors';

export default class Title extends Component {
  render(){
  	return(
      <View style={this.props.style}>
          <View style={{ flexDirection:'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '80%' }}>
            <Icon color={colors.primary2} name='drink' size={30} type='entypo' />
            <Icon color={colors.primary2} name='user' size={50} type='simple-line-icon' />
            <Icon color={colors.primary2} name='food' size={40} type='material-community' />
            <Icon color={colors.primary2} name='user-female' size={50} type='simple-line-icon' />
            <Icon color={colors.primary2} name='food-variant' size={40} type='material-community' />
          </View>
          <View style={{ flexDirection:'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
            <Icon color={colors.primary2} name='food-apple' size={30} type='material-community' />
            <Text h1 style={{ color: colors.primary2 }}>Split The Bill</Text>
            <Icon color={colors.primary2} name='food-croissant' size={40} type='material-community' />
          </View>
          <View style={{ flexDirection:'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '80%' }}>
            <Icon color={colors.primary2} name='restaurant' size={30} />
            <Icon color={colors.primary2} name='user-md' size={50} type='font-awesome' />
            <Icon color={colors.primary2} name='food-fork-drink' size={40} type='material-community' />
            <Icon color={colors.primary2} name='user-secret' size={50} type='font-awesome' />
            <Icon color={colors.primary2} name='restaurant-menu' size={40} />
          </View>
        </View>
  	)
  }
}