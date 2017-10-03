import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Icon,
  Divider,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';

export default class SplitInputs extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      error: false,
      amount: ''
    };
  }



  render(){
    const normalColor = '#FFFFFF';
    const errorColor = '#F39D41';

  	return(
  	  <View>
        <FormLabel labelStyle={{color: this.state.error? errorColor : normalColor}}>Amount To Split</FormLabel>
        <FormInput 
          defaultValue={this.state.amount}
          inputStyle={{color: this.state.error? errorColor: normalColor}}
          keyboardType={'numeric'}
          selectionColor={this.state.error? errorColor: normalColor}
          underlineColorAndroid={this.state.error? errorColor : normalColor}
          onChangeText={(amount) => {
            if(amount >= 0){
              this.setState({amount: amount, error: false});
            } else {
              this.setState({amount: amount, error: true});
            }
          }}
          shake={this.state.error}
        />
        <FormValidationMessage 
          containerStyle={{display: this.state.error? 'flex' : 'none'}}
          labelStyle={{color: this.state.error? errorColor : normalColor}}
        >
          {'Amount has to be non-negative number.'}
        </FormValidationMessage>
      </View>
    )
  }
}