import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import colors from 'Colors';

export default class SplitInputs extends Component {

  constructor(props) {
    super(props);
  
    this.state = {...props.info};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps.info});
  }


  render(){
    const onAmountInput = this.props.onAmountInput;
    const onPeopleInput = this.props.onPeopleInput;

  	return(
      <View style={this.props.style}>
        {/* First row for inputting amounts */}
    	  <View style={styles.rows}>
          {/* Money Icon */}
          <View style={styles.icons}>
            <Icon
              raised
              reverse
              color={colors.normalColor1}
              name='dollar'
              type='foundation'
            />
          </View>
          {/* Input form for amounts */}
          <View style={styles.inputs}>
            {/* Input label */}
            <FormLabel labelStyle={{color: this.state.error1? colors.errorColor : colors.normalColor1}}>Amount To Split</FormLabel>
            {/* Form input */}
            <FormInput 
              defaultValue={this.state.amount}
              inputStyle={{color: this.state.error1? colors.errorColor: colors.normalColor1}}
              keyboardType={'numeric'}
              selectionColor={this.state.error1? colors.errorColor: colors.normalColor1}
              underlineColorAndroid={this.state.error1? colors.errorColor : colors.normalColor1}
              onChangeText={(amount) => onAmountInput(amount)}
              shake={this.state.error1}
            />
            {/* Error message on invalid inputs */}
            <FormValidationMessage 
              containerStyle={{display: this.state.error1? 'flex' : 'none'}}
              labelStyle={{color: this.state.error1? colors.errorColor : colors.normalColor1}}
            >
              {'Amount has to be non-negative number.'}
            </FormValidationMessage>
          </View>
        </View>
        {/* Second row for inputting number of people */}
        <View style={styles.rows}>
          {/* Icon for people */}
          <View style={styles.icons}>
            <Icon
              raised
              reverse
              color={colors.normalColor2}
              name='users'
              type='font-awesome'
            />
          </View>
          {/* Input form for people */}
          <View style={styles.inputs}>
            <FormLabel labelStyle={{color: this.state.error2? colors.errorColor : colors.normalColor2}}>Number of People</FormLabel>
            <FormInput 
              defaultValue={this.state.people}
              inputStyle={{color: this.state.error2? colors.errorColor: colors.normalColor2}}
              keyboardType={'numeric'}
              selectionColor={this.state.error2? colors.errorColor: colors.normalColor2}
              underlineColorAndroid={this.state.error2? colors.errorColor : colors.normalColor2}
              onChangeText={(people) => onPeopleInput(people)}
              shake={this.state.error2}
            />
            {/* Error message for invalid inputs */}
            <FormValidationMessage 
              containerStyle={{display: this.state.error2? 'flex' : 'none'}}
              labelStyle={{color: this.state.error2? colors.errorColor : colors.normalColor2}}
            >
              {'Number of people has to be positive number.'}
            </FormValidationMessage>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // Container of a row
  rows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // Container of the icon
  icons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Container of the inputs
  inputs: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});