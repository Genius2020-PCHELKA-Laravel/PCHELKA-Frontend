import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './src/screens/HomeScreen';
import { setNavigator } from './src/NavigationRef';
import verify from './src/screens/verify';
import location from './src/screens/location';
import Frequency from './src/screens/Frequency';
import freecleaning from './src/screens/freecleaning';
import LogIn from './src/screens/LogIn';
import { Provider as AuthProvider } from './src/screens/context/Authcontext';
import { exp } from 'react-native-reanimated';
import InternetScreen from './src/screens/InternetScreen';
import setting from './src/screens/setting';
import appointment from './src/screens/appointment';
import support from './src/screens/support';
import HomeScreenLogIn from './src/screens/HomeScreenLogIn';
import DateAndTime from './src/screens/DateAndTime';
import CleaningDetails from './src/screens/CleaningDetails';
import Addressdetails from './src/screens/Addressdetails';
import LoginPhoneScreen from './src/screens/LoginPhoneScreen';
import Payment from './src/screens/Payment';
import Slidebar from './src/components/SlideBar';

const navigator = createSwitchNavigator({
  switch1: createStackNavigator({
    Internet: InternetScreen,
    HomeScreen: { navigationOptions: { headerShown: false }, screen: HomeScreen },
    Login: LoginPhoneScreen
  },
    {
      initialRouteName: 'Internet',
      defaultNavigationOptions: {
        headerShown: true
      }
    })
});




// const navigator = createSwitchNavigator({
//   internet: { navigationOptions: { headerShown: false }, screen: Internetscreen },

//   Home: {
//     navigationOptions: { headerShown: false },
//     screen: createStackNavigator({
//       Homepage: HomeScreen,
//       loginph: loginphone,
//       ver: verify,
//       locationscreen: location,
//       frequency: Frequency,
//       cleanindetailsscreen: CleaningDetails,
//       datetimescreen: DateAndTime,
//       Payment: Payment,
//       Addresses: Addressdetails,

//     })
//   },
//   h: {
//     navigationOptions: { headerShown: false },
//     screen: createStackNavigator({

//       loginFlow: {
//         navigationOptions: { headerShown: false },
//         screen: createDrawerNavigator({
//           LogIn: { navigationOptions: { headerShown: false }, screen: HomeScreenLogIn },
//           Settingscreen: setting,
//           Appointmentscreen: appointment,
//           Freecleaningscreen: freecleaning,
//           Supportscreen: support
//         }, { contentComponent: props => <Slidebar {...props} /> }
//         )
//       },
//       locationscreen: location,
//       frequency: Frequency,
//       cleanindetailsscreen: CleaningDetails,
//       datetimescreen: DateAndTime,
//       Addresses: Addressdetails,
//       Payment: Payment,


//     })
//   }
// },
// );


const App = createAppContainer(navigator);
export default () => {
  return (
    <AuthProvider><App ref={(navigator) => { setNavigator(navigator) }} /></AuthProvider>);
}

