import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import SplitInputs from '../components/SplitInputs';
import SplitResults from '../components/SplitResults';
import { StackNavigator } from 'react-navigation';

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
    headerRight: <Icon name='dollar-bill' color='steelblue' type='foundation' containerStyle={{ paddingRight: 10 }}/>,
    headerTintColor: 'steelblue'
  })

  render(){
  	return(
  	  <View style={styles.container}>
        <SplitInputs style={styles.splitInputs} handleSubmit={this.handleSubmit}/>
        <SplitResults style={styles.results} info={this.state}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // Outermost container
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // Container for inputs for splitting bill
  splitInputs: {
    flex: 1,
    backgroundColor: 'white',
  },
  // Container for showing results
  results: {
    flex: 1,
    backgroundColor: 'white',
  }
});