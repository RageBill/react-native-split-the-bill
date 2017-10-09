import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
// import { StackNavigator } from 'react-navigation';
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
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Hi</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // Outermost container
  container: {
    flex: 1,
    backgroundColor: colors.primary1,
  }
});