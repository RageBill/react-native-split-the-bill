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
      buttonHidden: false, // whether button is hidden
      cardHidden: true // whether result card is hidden
    };
  }

  // Unhide button when inputs change
  componentWillReceiveProps(nextProps) {
  	this.setState({...nextProps.info, buttonHidden: this.state.buttonHidden, cardHidden: this.state.cardHidden});
  }

  // Hiding button after submit
  hideButtonContainer = () => {
    this.setState({buttonHidden: true, cardHidden: false});
  }

  // Hiding result card after done
  hideResultCard = () => {
    this.setState({buttonHidden: false, cardHidden: true});
  }

  render(){
    const showResult = this.state.calculate;
    const btnHidden = this.state.buttonHidden;
    const cardHidden = this.state.cardHidden;
    const handleSubmit = this.props.handleSubmit;
    const doneCalculate = this.props.doneCalculate;

    // Calculating results to be shown
  	const amount = this.state.amount || 0;
  	const people = this.state.people || 0;
  	const eachPay = Math.ceil(amount / people * 10) / 10 || 0; // 1 decimal place
  	const totalPaid = Math.ceil(eachPay * people * 10) / 10 || 0; // 1 decimal place
  	const grossChange = eachPay * people - amount || 0;
  	const change = Math.round(grossChange * 10) / 10 || 0; // 1 decimal place

    // Check if the button should be enabled
    const btnEnabled = this.state.amount && this.state.people && !this.state.error1 && !this.state.error2;

    // Default attributes for button animation
    let btnAnimation = '';
    let btnEasing = 'ease';
    let btnIterationCount = 1;
    let btnOnAnimationEnd = null;
    let btnDuration = 1000;

    // When button is awaiting to be pressed
    if(btnEnabled && !showResult && cardHidden && !btnHidden){
      btnAnimation = 'pulse';
      btnEasing = 'ease-out';
      btnIterationCount = 'infinite';
    }

    // When calculate button is pressed and then fade out
    if(btnEnabled && showResult && cardHidden && !btnHidden){
      btnAnimation = 'bounceOut';
      btnEasing = 'ease-out';
      btnIterationCount = 1;
      btnOnAnimationEnd = this.hideButtonContainer;
      btnDuration = 200;
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
    let cardOnAnimationEnd = null;
    let cardDuration = 400;

    // When calculate button is clicked and card is being displayed
    if(btnHidden && !cardHidden){
      cardAnimation = 'fadeInUpBig';
    }

    // When done button is clicked and then card fades out
    if(!cardHidden && !showResult){
      cardAnimation = 'fadeOutDown';
      cardDuration = 200;
      cardOnAnimationEnd = this.hideResultCard;
    }

    // Object supplied to card's animation
    const cardAnimationAttr = {
      animation: cardAnimation,
      onAnimationEnd: cardOnAnimationEnd,
      duration: cardDuration
    }

  	return(
  	  <View style={this.props.style}>
        {/* Only show button if not showing result already */}
        <Animatable.View 
          style={ btnHidden? {display: 'none'} : styles.submit }
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
          style={{ display: cardHidden? 'none' : 'flex'}}
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