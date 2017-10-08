import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Title from '../components/Title';
import MainScreenButtons from '../components/MainScreenButtons';
import colors from 'Colors';


export default class MainScreen extends Component {

  // Navigation options for this page
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Icon name='home' color={ colors.primary1 } containerStyle={{ paddingRight: 10, backgroundColor: colors.primary2 }}/>,
    headerTintColor: colors.primary1,
    headerStyle: { backgroundColor: colors.primary2 }
  })

  render(){
  	return(
      <View style={styles.container}>
        {/* Title of main screen */}
        <Title style={styles.headerContainer}/>
        {/* Buttons */}
        <MainScreenButtons style={styles.buttonContainer} navigation={this.props.navigation}/>
	  </View>
	)
  }
}

const styles = StyleSheet.create({
  // Outermost container
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary2,
  },
  // Container for the buttons
  buttonContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.primary1,
    width: '100%',
  },
  // Container for the title
  headerContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.primary1,
    width: '100%',
  }
});