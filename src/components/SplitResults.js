import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Button, PricingCard } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import colors from 'Colors';

export default class SplitResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.info,
      hideButtonContainer: false // whether button is showing
    };
  }

  // Unhide button when inputs change
  componentWillReceiveProps(nextProps) {
  	this.setState({...nextProps.info, hideButtonContainer: false});
  }

  // Hiding button after submit
  hideButtonContainer = () => {
    this.setState({hideButtonContainer: true});
  }

  render(){
    const showResult = this.state.calculate;
    const hideButton = this.state.hideButtonContainer;
    const handleSubmit = this.props.handleSubmit;
    const doneCalculate = this.props.doneCalculate;

    // Calculating results to be shown
  	const amount = this.state.calculate? this.state.amount : 0;
  	const people = this.state.calculate? this.state.people : 0;
  	const eachPay = this.state.calculate? Math.ceil(amount / people * 10) / 10 : 0; // 1 decimal place
  	const totalPaid = this.state.calculate? Math.ceil(eachPay * people * 10) / 10 : 0; // 1 decimal place
  	const grossChange = this.state.calculate? eachPay * people - amount : 0;
  	const change = this.state.calculate? Math.round(grossChange * 10) / 10 : 0; // 1 decimal place

    // Check if the button should be enabled
    const btnEnabled = this.state.amount && this.state.people && !this.state.error1 && !this.state.error2;

    // Default attributes for button animation
    let btnAnimation = '';
    let btnEasing = 'ease';
    let btnIterationCount = 1;
    let btnOnAnimationEnd = null;
    let btnDuration = 1000;

    // Animation attributes when button is awaiting to be pressed
    if(btnEnabled){
      btnAnimation = 'pulse';
      btnEasing = 'ease-out';
      btnIterationCount = 'infinite';
    }

    if(btnEnabled && showResult){
      btnAnimation = 'fadeOut';
      btnEasing = 'ease-out';
      btnIterationCount = 1;
      btnOnAnimationEnd = this.hideButtonContainer;
    }

    // Object supplied to button's animation
    const btnAnimationAttr = {
      animation: btnAnimation,
      easing: btnEasing,
      iterationCount: btnIterationCount,
      onAnimationEnd: btnOnAnimationEnd,
      duration: btnDuration
    }

    // Default attributes for result card animation
    let cardAnimation = '';
    let cardDelay = btnDuration; // card appears after button disappeared

    if(hideButton){
      cardAnimation = 'fadeIn';
    }

    // Object supplied to card's animation
    const cardAnimationAttr = {
      animation: cardAnimation,
      delay: cardDelay
    }


    // Custom animation for fading out
    const fadeOut = {
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      }
    }

    // Custom animation for fading in
    const fadeIn = {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      }
    }

  	return(
  	  <View style={this.props.style}>
        {/* Only show button if not showing result already */}
        <Animatable.View 
          style={ hideButton? {display: 'none'} : styles.submit }
          {...btnAnimationAttr}
        >
          {/* Submit Button */}
          <Button
            containerViewStyle={{ width: '70%', borderRadius: 20 }}
            borderRadius={100}
            raised
            disabled={btnEnabled? false : true}
            backgroundColor='#0072b1'
            icon={{ name: 'calculator', type: 'font-awesome' }}
            onPress={() => handleSubmit()}
            title="Calculate"
          />
        </Animatable.View>
        {/* Card for displaying results */}
        <Animatable.View 
          style={{ display: hideButton? 'flex' : 'none'}}
          {...cardAnimationAttr}
        >
          <PricingCard
            color={colors.cardColor}
            title='Each Person Pays'
            price={'$' + eachPay}
            info={[
              'Total Paid: $' + totalPaid,
              'Change: $' + change,
            ]}
            button={{title: 'Done', icon: 'check'}}
            containerStyle={{display: showResult? 'flex' : 'none'}}
            onButtonPress={() => doneCalculate()}
          />
        </Animatable.View>
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