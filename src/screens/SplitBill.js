import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import SplitInputs from '../components/SplitInputs';
import SplitResults from '../components/SplitResults';
import { StackNavigator } from 'react-navigation';

// Colors
const primary1 = '#FFFFFF'; // White
const primary2 = '#6296F9'; // Blue

export default class SplitBill extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      amount: 0,
      people: 0
    };
  }

  handleSubmit = (amount, people) => {
    this.setState({amount: amount, people: people});
  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'Splitting The Bill',
    headerRight: <Icon name='dollar-bill' color={primary1} type='foundation' containerStyle={{ paddingRight: 10, backgroundColor: primary2 }}/>,
    headerTintColor: primary1,
    headerStyle: { backgroundColor: primary2 }
  })

  render(){
  	return(
  	  <ScrollView style={styles.container}>
        <SplitInputs style={styles.splitInputs} handleSubmit={this.handleSubmit}/>
        <SplitResults style={styles.results} info={this.state}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  // Outermost container
  container: {
    flex: 1,
    backgroundColor: primary1,
  },
  // Container for inputs for splitting bill
  splitInputs: {
    flex: 1,
    backgroundColor: primary1,
  },
  // Container for showing results
  results: {
    flex: 1,
    backgroundColor: primary1,
  }
});