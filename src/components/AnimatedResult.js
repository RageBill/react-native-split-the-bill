/*

  Animation flow:

  1. When there is input
       --> "pulse" effect on button to prompt for click

  2. Calculate button clicked
       --> handleSubmit() => this.state.calculate becomes true
         --> button's animation switches to "bounceOut"
           --> (when above animation ends) hideButtonContainer() => this.state.buttonHidden becomes true & this.state.cardHidden becomes false
             --> card's animation switches to "fadeInUpBig"
              --> card displays results

  3. Card's done button clicked
       --> doneCalculate() => this.state.calculate becomes false
         --> card's animation switches to "fadeOutDown"
           --> (when above animation ends) hideResultCard() => this.state.buttonHidden becomes false & this.state.cardHidden becomes true
             --> button appears again

  Props required for usage:

  1. (boolean) btnEnabled --> for animation 1 (pulse effect) when there is input
  2. (string) cardTitle --> text for result card's title
  3. (number) result --> text for result card's main result
  4. (array) info --> for result card's small text
  5. [optional](style object) display --> style for outer container

*/

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Button, PricingCard } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import colors from 'Colors';

export default class AnimatedResult extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      calculate: false, // whether the calculate button is clicked
      buttonHidden: false, // whether button is hidden
      cardHidden: true // whether result card is hidden
    }
  }

  // Handling submit button click
  handleSubmit = () => {
    this.setState({calculate: true});
  }

  // Done button pressed for calculation
  doneCalculate = () => {
    this.setState({calculate: false});
  }

  // Hiding button after submit
  hideButtonContainer = () => {
    this.setState({buttonHidden: true, cardHidden: false});
  }

  // Hiding result card after done
  hideResultCard = () => {
    this.setState({buttonHidden: false, cardHidden: true});
  }

  // If the result is shown and the result is changed
  componentWillReceiveProps(nextProps) {
    if(!this.state.cardHidden && (this.props.result != nextProps.result || this.props.info != nextProps.info)){
      this.doneCalculate();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let propsChanged = (this.props.btnEnabled != nextProps.btnEnabled);
    let stateChanged = (this.state != nextState);
    // Update when either props or state changed
    return propsChanged || stateChanged;
  }

  render(){
    const showResult = this.state.calculate;
    const btnHidden = this.state.buttonHidden;
    const cardHidden = this.state.cardHidden;
    const handleSubmit = this.state.handleSubmit;
    const doneCalculate = this.state.doneCalculate;

    // Check if the button should be enabled
    const btnEnabled = this.props.btnEnabled;

    /********************/
    /* Button Animation */
    /********************/

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

    /********************/
    /*  Card Animation  */
    /********************/

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
      <View style={ StyleSheet.flatten([styles.container, this.props.display]) }>
        {/* Result button & display */}
        <Animatable.View style={ btnHidden? {display: 'none'} : styles.submit } {...btnAnimationAttr}>
          {/* Submit Button */}
          <Button
            containerViewStyle={{ width: '70%', borderRadius: 20 }}
            borderRadius={100}
            raised
            disabled={!btnEnabled}
            backgroundColor='#0072b1'
            icon={{ name: 'calculator', type: 'font-awesome' }}
            onPress={() => this.handleSubmit()}
            title="Calculate"
          />
        </Animatable.View >
        {/* Card for displaying results */}
        <Animatable.View style={{ display: cardHidden? 'none' : 'flex' }} {...cardAnimationAttr}>
          <PricingCard
            color={colors.cardColor}
            title={this.props.cardTitle}
            price={'$' + this.props.result}
            info={this.props.info}
            button={{title: 'Done', icon: 'check'}}
            onButtonPress={() => this.doneCalculate()}
          />
        </Animatable.View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  // Main Container
  container: {
    width: '100%',
    height: '100%',
  },
  // Calculate button
  submit: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  }
});