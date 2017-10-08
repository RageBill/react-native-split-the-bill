import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Icon,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import colors from 'Colors';

export default class SplitInputs extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      error1: false, // Error for amount to split
      error2: false, // Error for number of people
      amount: '', // Amount of bill to split
      people: '' // Number of people to split amongst
    };
  }



  render(){
    const handleSubmit = this.props.handleSubmit;

  	return(
      <View style={this.props.style}>
    	  <View style={styles.rows}>
          <View style={styles.icons}>
            <Icon
              raised
              reverse
              color={colors.normalColor_1}
              name='dollar'
              type='foundation'
            />
          </View>
          <View style={styles.inputs}>
            <FormLabel labelStyle={{color: this.state.error1? colors.errorColor : colors.normalColor_1}}>Amount To Split</FormLabel>
            <FormInput 
              defaultValue={this.state.amount}
              inputStyle={{color: this.state.error1? colors.errorColor: colors.normalColor_1}}
              keyboardType={'numeric'}
              selectionColor={this.state.error1? colors.errorColor: colors.normalColor_1}
              underlineColorAndroid={this.state.error1? colors.errorColor : colors.normalColor_1}
              onChangeText={(amount) => {
                if(amount >= 0){
                  this.setState({amount: amount, error1: false});
                } else {
                  this.setState({amount: amount, error1: true});
                }
              }}
              shake={this.state.error1}
            />
            <FormValidationMessage 
              containerStyle={{display: this.state.error1? 'flex' : 'none'}}
              labelStyle={{color: this.state.error1? colors.errorColor : colors.normalColor_1}}
            >
              {'Amount has to be non-negative number.'}
            </FormValidationMessage>
          </View>
        </View>
        <View style={styles.rows}>
          <View style={styles.icons}>
            <Icon
              raised
              reverse
              color={colors.normalColor_2}
              name='users'
              type='font-awesome'
            />
          </View>
          <View style={styles.inputs}>
            <FormLabel labelStyle={{color: this.state.error2? colors.errorColor : colors.normalColor_2}}>Number of People</FormLabel>
            <FormInput 
              defaultValue={this.state.people}
              inputStyle={{color: this.state.error2? colors.errorColor: colors.normalColor_2}}
              keyboardType={'numeric'}
              selectionColor={this.state.error2? colors.errorColor: colors.normalColor_2}
              underlineColorAndroid={this.state.error2? colors.errorColor : colors.normalColor_2}
              onChangeText={(people) => {
                if(people >= 1 || people == ''){
                  this.setState({people: people, error2: false});
                } else {
                  this.setState({people: people, error2: true});
                }
              }}
              shake={this.state.error2}
            />
            <FormValidationMessage 
              containerStyle={{display: this.state.error2? 'flex' : 'none'}}
              labelStyle={{color: this.state.error2? colors.errorColor : colors.normalColor_2}}
            >
              {'Number of people has to be positive number.'}
            </FormValidationMessage>
          </View>
        </View>
        <View style={styles.submit}>
          <Button
            containerViewStyle={{ width: '70%', borderRadius: 20 }}
            borderRadius={100}
            raised
            disabled={(this.state.amount && this.state.people && !this.state.error1 && !this.state.error2)? false : true}
            backgroundColor='#0072b1'
            icon={{ name: 'calculator', type: 'font-awesome' }}
            onPress={() => handleSubmit(this.state.amount, this.state.people)}
            title="Calculate"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // Container of a row
  rows: {
    flex: 4,
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
  },
  // Container of submit button
  submit: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});