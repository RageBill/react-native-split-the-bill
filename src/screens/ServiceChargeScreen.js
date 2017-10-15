import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Button, PricingCard } from 'react-native-elements';
import { Switch } from 'react-native-switch';
import TextField from 'react-native-md-textinput';
import * as Animatable from 'react-native-animatable';
import AnimatedResult from '../components/AnimatedResult';
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

  render(){
    // Calculating Result Total
    let amount = parseInt(this.state.amount) || 0;
    let total = (this.state.inputText == 'Raw Amount')? amount * 1.1 : amount / 1.1;
    total = Math.round(total * 10) / 10;

    // Check if the button should be enabled
    const btnEnabled = (this.state.amount > 0);

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
          {/* Animated button + display */}
          <AnimatedResult
           btnEnabled={btnEnabled}
           cardTitle={this.state.resultText}
           result={total}
           info={[]}
          />
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