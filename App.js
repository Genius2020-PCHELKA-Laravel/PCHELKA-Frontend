import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FontBold from './src/components/FontBold'
import FontRegular from './src/components/FontRegular'
import FontLight from './src/components/FontLight'
import HomeScreen from './src/screens/HomeScreen';
import { setNavigator } from './src/navigationRef';
import location from './src/screens/location';
import HomeCleaningScreen from './src/screens/HomeCleaningScreen';
import freecleaning from './src/screens/freecleaning';
import LogIn from './src/screens/LogIn';
import { Provider as AuthProvider } from './src/screens/context/AuthContext';
import { Provider as UserProvider } from './src/screens/context/UserContext';
import { Provider as HCProvider } from './src/screens/context/HCContext';
import { exp } from 'react-native-reanimated';
import InternetScreen from './src/screens/InternetScreen';
import SettingScreen from './src/screens/drawerScreens/SettingScreen';
import AppoitmentScreen from './src/screens/drawerScreens/AppoitmentScreen';
import FreeScreen from './src/screens/drawerScreens/FreeScreen';
import SupportScreen from './src/screens/drawerScreens/SupportScreen';
import HomeScreenLogIn from './src/screens/HomeScreenLogIn';
import DateAndTime from './src/screens/DateAndTime';
import CleaningDetails from './src/screens/CleaningDetails';
// import AddressdetailsSettings from './src/screens/AddressdetailsSettings';
import LoginPhoneScreen from './src/screens/LoginPhoneScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import RegisterUserScreen from './src/screens/RegisterUserScreen';
import Payment from './src/screens/Payment';
import Slidebar from './src/components/SlideBar';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutButton from './src/components/LogoutButton';
import SettingsButton from './src/components/SettingsButton';
import LoginButton from './src/components/LoginButton';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import EditPersonalDetailsScreen from './src/screens/drawerScreens/EditPersonalDetailsScreen';
import ManageAddresses from './src/screens/drawerScreens/ManageAddresses';
import ManageCreditCards from './src/screens/drawerScreens/ManageCreditCards';
const SCREEN_WIDTH = Dimensions.get('window').width;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
// const navigator = createSwitchNavigator({
//   switch1: createStackNavigator({
//     Internet: InternetScreen,
//     HomeScreen: { navigationOptions: { headerShown: false }, screen: HomeScreen },
//     HomeScreenLogIn: { navigationOptions: { headerShown: false }, screen: HomeScreenLogIn },
//     Login: LoginPhoneScreen,
//     Verify: VerifyScreen,
//     Register: { navigationOptions: { headerShown: false }, screen: RegisterUserScreen },

//   },
//     {
//       initialRouteName: 'Internet',
//       defaultNavigationOptions: {
//         headerShown: true
//       }
//     })
// });








const HomeStackNavigator = createStackNavigator(
  {
    HomeNavigator: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: '',
          headerLeft: () =>
            <Icon
              style={{ left: 15, color: '#FF9800' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={40}
            />,
          headerRight: () => (
            <SettingsButton />
          )
          ,
          headerStyle: {
            // backgroundColor: '#FF9800',
          },
          // headerTintColor: '#fff',
        };
      },
    },
  });
const SettingStackNavigator = createStackNavigator(
  {
    SettingNavigator: {
      screen: SettingScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: <FontBold mystyle={{ left: 10, padding: 15, color: '#FF9800', fontSize: 20 }} value='Settings' />,
          headerLeft: () =>
            <Icon
              style={{ left: 15, color: '#FF9800' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={40}
            />,
          headerStyle: {
            // backgroundColor: '#FF9800',
          },
          // headerTintColor: '#fff',
        };
      },
    },
    EditPersonalDetailsScreen: {
      screen: EditPersonalDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Personal Details',
        // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
    ManageAddresses: {
      screen: ManageAddresses,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage Addresses',
        // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
    ManageCreditCards: {
      screen: ManageCreditCards,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage Addresses',
        // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
  });



const AppoitmentStackNavigator = createStackNavigator(
  {
    AppoitmentNavigator: AppoitmentScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: 'Appoitment',
        headerLeft: () =>
          <Icon
            style={{ left: 15, color: '#FF9800' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={40}
          />,

        headerStyle: {
          // backgroundColor: '#FF9800',
        },
        // headerTintColor: '#fff',
      };
    }
  }
);
const FreeStackNavigator = createStackNavigator(
  {
    FreeNavigator: FreeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: 'Free Cleaning',
        headerLeft: () =>
          <Icon
            style={{ left: 15, color: '#FF9800' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={40}
          />,

        headerStyle: {
          // backgroundColor: '#FF9800',
        },
        // headerTintColor: '#fff',
      };
    }
  }
);
const SupportStackNavigator = createStackNavigator(
  {
    SupportNavigator: SupportScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: 'Support',
        headerLeft: () =>
          <Icon
            style={{ left: 15, color: '#FF9800' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={40}
          />,

        headerStyle: {
          // backgroundColor: '#FF9800',
        },
        // headerTintColor: '#fff',
      };
    }
  }
);
const AppDrawerNavigator = createDrawerNavigator({
  HomeDrawerNavigator: {
    screen: HomeStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value='Home' />,
      drawerIcon: <FontAwesome5 name="home" size={25} color="#fff" />
    },
  },
  SettingDrawerNavigator: {
    screen: SettingStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value='Account Settings' />,
      drawerIcon: <MaterialCommunityIcons name="account-settings" size={30} color="#fff" />
    },
  },
  AppointmentDrawerNavigator: {
    screen: AppoitmentStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value='Appoitments' />,
      drawerIcon: <Fontisto name="date" size={25} color="#fff" />
    },
  },
  FreeDrawerNavigator: {
    screen: FreeStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value='Free Cleaning' />,
      drawerIcon: <MaterialCommunityIcons name="ticket-percent" size={25} color="#fff" />
    },
  },
  SupportDrawerNavigator: {
    screen: SupportStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value='Support' />,
      drawerIcon: <AntDesign name="message1" size={25} color="#fff" />
    },
  }
},
  // { edgeWidth: 20, drawerType: 'slide', overlayColor: 'red', },

  {
    navigationOptions: {
      gesturesEnabled: false,
      mode: 'modal',
    },
    initialRouteName: "HomeDrawerNavigator",
    contentOptions: {
      // activeTintColor: "#e91e63"
    },
    drawerWidth: SCREEN_WIDTH * 0.65,
    drawerPosition: 'left',
    drawerType: 'slide',
    edgeWidth: 25,
    contentComponent: props => <Slidebar {...props} />
  }
);

const LoginFlow = createStackNavigator(
  // Internet: { navigationOptions: { headerShown: false }, screen: InternetScreen },
  // HomeScreen: { navigationOptions: { headerShown: false }, screen: HomeScreen },
  {
    HomeScreenLogIn: {
      screen: HomeScreenLogIn,
      navigationOptions: {
        title: '',
        headerRight: () => (
          <LoginButton />),
        headerStyle: {
          // backgroundColor: '#FF9800',
        },
        // headerTintColor: '#fff',
      }
    },
    LoginPhone: LoginPhoneScreen,
    Verify: VerifyScreen,
    Register: RegisterUserScreen,
    HomeCleaningScreen: { screen: HomeCleaningScreen, navigationOptions: { title: 'Home Cleaning', } },
  },
  // {
  //   defaultNavigationOptions: ({ navigation }) => {
  //     return {
  //       title: '',
  //       headerRight: () => (
  //         <LoginButton />),
  //       headerStyle: {
  //         backgroundColor: '#FF9800',
  //       },
  //       headerTintColor: '#fff',
  //     };
  //   }
  // },
  {
    initialRouteName: 'HomeScreenLogIn',
    defaultNavigationOptions: {
      headerShown: true
    }
  });


const MainFlow = createSwitchNavigator({
  Dashboard: { screen: AppDrawerNavigator },
  LoginFlow: { screen: LoginFlow },
});

const AppSwitchNavigator = createSwitchNavigator({
  Internet: { navigationOptions: { headerShown: false }, screen: InternetScreen },
  MainFlow: { screen: MainFlow },
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


const App = createAppContainer(AppSwitchNavigator);
export default () => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <HCProvider>
            <App ref={(navigator) => { setNavigator(navigator) }} />
          </HCProvider>
        </UserProvider>
      </AuthProvider>
    </PaperProvider>);
}

