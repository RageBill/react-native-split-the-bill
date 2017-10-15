import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import SplitInputs from '../components/SplitInputs';
import AnimatedResult from '../components/AnimatedResult'
import colors from 'Colors';

export default class SplitBillScreen extends Component {

  // Navigation options for this page
  static navigationOptions = ({navigation}) => ({
    title: 'Split Bill',
    headerRight: <Icon name='dollar-bill' color={colors.primary1} type='foundation' containerStyle={{ paddingRight: 10, backgroundColor: colors.primary2 }}/>,
    headerTintColor: colors.primary1,
    headerStyle: { backgroundColor: colors.primary2 }
  })

  constructor(props) {
    super(props);
  
    this.state = {
      error1: false, // Error for amount to split
      error2: false, // Error for number of people
      amount: '', // Amount of bill to split
      people: '', // Number of people to split amongst
    };
  }

  // State changes when input for amount changes
  onAmountInput = (amount) => {
    if(amount >= 0){
      this.setState({amount: amount, error1: false});
    } else {
      this.setState({amount: amount, error1: true});
    }
  }

  // State changes when input for number of people changes
  onPeopleInput = (people) => {
    if(people >= 1 || people == ''){
      this.setState({people: people, error2: false});
    } else {
      this.setState({people: people, error2: true});
    }
  }

  render(){

    // Calculating results to be shown
    const amount = this.state.amount || 0;
    const people = this.state.people || 0;
    const eachPay = Math.ceil(amount / people * 10) / 10 || 0; // 1 decimal place
    const totalPaid = Math.ceil(eachPay * people * 10) / 10 || 0; // 1 decimal place
    const grossChange = eachPay * people - amount || 0;
    const change = Math.round(grossChange * 10) / 10 || 0; // 1 decimal place

    // Check if the button should be enabled
    const btnEnabled = this.state.amount && this.state.people && !this.state.error1 && !this.state.error2;

  	return(
  	  <ScrollView style={styles.container}>
        <SplitInputs 
          style={styles.splitInputs} 
          info={this.state} 
          onAmountInput={this.onAmountInput} 
          onPeopleInput={this.onPeopleInput}
        />
        <AnimatedResult
          display={styles.results}
          btnEnabled={btnEnabled}
          cardTitle={'Each Person Pays'}
          result={eachPay}
          info={[
            'Total Paid: $' + totalPaid,
            'Change: $' + change,
          ]}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  // Outermost container
  container: {
    flex: 1,
    backgroundColor: colors.primary1,
  },
  // Container for inputs for splitting bill
  splitInputs: {
    flex: 1,
    backgroundColor: colors.primary1,
  },
  // Container for showing results
  results: {
    flex: 1,
    backgroundColor: colors.primary1,
  }
});