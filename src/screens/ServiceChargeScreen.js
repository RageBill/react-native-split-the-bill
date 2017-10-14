import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Button, PricingCard } from 'react-native-elements';
import { Switch } from 'react-native-switch';
import TextField from 'react-native-md-textinput';
import * as Animatable from 'react-native-animatable';
import colors from 'Colors';

export default class ServiceChargeScreen extends Component {

  // Navigation options for this page
  static navigationOptions = ({navigation}) => ({
    title: 'Service Charge',
    headerRight: <Icon name='restaurant' color={colors.primary1} containerStyle={{ paddingRight: 10, backgroundColor: colors.primary2 }}/>,
    headerTintColor: colors.primary1,
    headerStyle: { backgroundColor: colors.primary2 }
  })

  constructor(props) {
    super(props);

    this.state = {
      inputText: 'Raw Amount',
      resultText: 'Total (+10% Charge)',
      amount: '',
      calculate: false,
      buttonHidden: false, // whether button is hidden
      cardHidden: true // whether result card is hidden
    }
  }

  toggleServiceCharge = (value) => {
    if(value){
      this.setState({inputText: 'Amount including 10% Service Charge', resultText: 'Total Before Charge'});
    } else {
      this.setState({inputText: 'Raw Amount', resultText: 'Total (+10% Charge)'});
    }
  }

  saveAmount = (amount) => {
    this.setState({amount});
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

  render(){
    // Calculating Result Total
    let amount = parseInt(this.state.amount) || 0;
    let total = (this.state.inputText == 'Raw Amount')? amount * 1.1 : amount / 1.1;
    total = Math.round(total * 10) / 10;

    const showResult = this.state.calculate;
    const btnHidden = this.state.buttonHidden;
    const cardHidden = this.state.cardHidden;
    const handleSubmit = this.state.handleSubmit;
    const doneCalculate = this.state.doneCalculate;

    // Check if the button should be enabled
    const btnEnabled = (this.state.amount > 0);

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
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.banner}>
          {/* Icon */}
          <Icon 
            color={colors.primary1}
            name='drink'
            size={62}
            type='entypo'
          />
          {/* Text */}
          <Text style={styles.heading}>Service Charge Included?</Text>
          {/* Switch */}
          <Switch
            containerStyle={styles.switchToggle}
            value={false}
            onValueChange={(value) => this.toggleServiceCharge(value) }
            activeText={'Y'}
            inActiveText={'N'}
            backgroundActive={'green'}
            backgroundInactive={'grey'}
          />
        </View>
        {/* Bottom Result Container */}
        <View style={styles.result}>
          {/* Text input for amount */}
          <TextField
            label={this.state.inputText}
            labelColor={'grey'}
            highlightColor={colors.normalColor2}
            keyboardType={'numeric'}
            dense={true}
            value={this.state.amount}
            wrapperStyle={{width: '80%'}}
            onChangeText={(amount) => this.saveAmount(amount)}
          />
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
              title={this.state.resultText}
              price={'$' + total}
              info={[]}
              button={{title: 'Done', icon: 'check'}}
              onButtonPress={() => this.doneCalculate()}
            />
          </Animatable.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // Outermost container
  container: {
    flex: 1,
    backgroundColor: colors.primary1,
  },
  // Banner
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary2,
  },
  // Switch
  switchToggle: {
    marginTop: 10,
    width: 100,
  },
  // Heading
  heading: {
    color: colors.primary1,
    marginTop: 10,
    fontSize: 22,
  },
  // Result container
  result: {
    flex: 1,
    alignItems: 'center',
  },
  // Submit
  submit: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  }
});