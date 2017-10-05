import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Icon,
  Button,
  PricingCard
} from 'react-native-elements';

export default class SplitResults extends Component {
  constructor(props) {
    super(props);

    this.state = {...props.info};
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({...nextProps.info});
  }

  render(){
  	const amount = this.state.amount || 0;
  	const people = this.state.people || 0;
  	const eachPay = Math.ceil(amount / people * 10) / 10 || 0;
  	const totalPaid = eachPay * people || 0;
  	const grossChange = eachPay * people - amount || 0;
  	const change = Math.round(grossChange * 10) / 10 || 0;

  	return(
  	  <View style={this.props.style}>
  	    <PricingCard
  	      color='#4F9DEB'
  	      title='Each Person Pays'
  	      price={'$' + eachPay}
  	      info={[
  	      	'Total Paid: $' + totalPaid,
  	      	'Change: $' + change,
  	      ]}
  	      button={{title: 'Done', icon: 'check', display: 'none'}}
  	    />
  	  </View>
  	)
  }
}