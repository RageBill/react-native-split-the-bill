import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import SplitInputs from '../components/SplitInputs';
import SplitResults from '../components/SplitResults';
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
      calculate: false // Whether to calculate and show the result
    };
  }

  // Handling submit button click
  handleSubmit = () => {
    this.setState({calculate: true});
  }

  // Done button pressed for calculation
  doneCalculate = () => {
    this.setState({calculate: false});
  }

  // State changes when input for amount changes
  onAmountInput = (amount) => {
    if(amount >= 0){
      this.setState({amount: amount, error1: false, calculate: false});
    } else {
      this.setState({amount: amount, error1: true, calculate: false});
    }
  }

  // State changes when input for number of people changes
  onPeopleInput = (people) => {
    if(people >= 1 || people == ''){
      this.setState({people: people, error2: false, calculate: false});
    } else {
      this.setState({people: people, error2: true, calculate: false});
    }
  }

  render(){
  	return(
  	  <ScrollView style={styles.container}>
        <SplitInputs 
          style={styles.splitInputs} 
          info={this.state} 
          onAmountInput={this.onAmountInput} 
          onPeopleInput={this.onPeopleInput}
        />
        <SplitResults 
          style={styles.results} 
          info={this.state}
          handleSubmit={this.handleSubmit}
          doneCalculate={this.doneCalculate}
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