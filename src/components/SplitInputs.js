import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Icon,
  Divider
} from 'react-native-elements';
import TextField from 'react-native-md-textinput';

export default class SplitInputs extends Component {

  render(){
  	return(
  	  <View style={{ flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
        <TextField
          label='Amount To Split'
          highlightColor='skyblue'
          wrapperStyle={{ width: '60%' }}
        />
        <Divider style={{ backgroundColor: 'gainsboro', width: '100%', height: 2 }}/>
      </View>
    )
  }
}