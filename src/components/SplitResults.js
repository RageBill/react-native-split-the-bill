import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Button, PricingCard } from 'react-native-elements';
import colors from 'Colors';

export default class SplitResults extends Component {
  constructor(props) {
    super(props);

    this.state = {...props.info};
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({...nextProps.info});
  }

  render(){
  	const amount = this.state.calculate? this.state.amount : 0;
  	const people = this.state.calculate? this.state.people : 0;
  	const eachPay = this.state.calculate? Math.ceil(amount / people * 10) / 10 : 0;
  	const totalPaid = this.state.calculate? eachPay * people : 0;
  	const grossChange = this.state.calculate? eachPay * people - amount : 0;
  	const change = this.state.calculate? Math.round(grossChange * 10) / 10 : 0;
    const handleSubmit = this.props.handleSubmit;
    const doneCalculate = this.props.doneCalculate;

  	return(
  	  <View style={this.props.style}>
        {/* Only show button if not showing result already */}
        <View style={this.state.calculate? {display: 'none'} : styles.submit }>
          {/* Submit Button */}
          <Button
            containerViewStyle={{ width: '70%', borderRadius: 20 }}
            borderRadius={100}
            raised
            disabled={(this.state.amount && this.state.people && !this.state.error1 && !this.state.error2)? false : true}
            backgroundColor='#0072b1'
            icon={{ name: 'calculator', type: 'font-awesome' }}
            onPress={() => handleSubmit()}
            title="Calculate"
          />
        </View>
        {/* Card for displaying results */}
  	    <PricingCard
  	      color={colors.cardColor}
  	      title='Each Person Pays'
  	      price={'$' + eachPay}
  	      info={[
  	      	'Total Paid: $' + totalPaid,
  	      	'Change: $' + change,
  	      ]}
  	      button={{title: 'Done', icon: 'check'}}
          containerStyle={{display: this.state.calculate? 'flex' : 'none'}}
          onButtonPress={() => doneCalculate()}
  	    />
  	  </View>
  	)
  }
}

const styles = StyleSheet.create({
  // Container of submit button
  submit: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }
});