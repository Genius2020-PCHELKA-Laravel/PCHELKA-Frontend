import React, { Component } from 'react';
import { Text, Dimensions, View } from 'react-native';
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
import UpcomingScreen from './src/screens/drawerScreens/UpcomingScreen';
import PastScreen from './src/screens/drawerScreens/PastScreen';
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
import { navigate } from './src/navigationRef';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { withNamespaces } from 'react-i18next';
import i18n from './src/locales/i18n';
import MapScreen from './src/screens/MapScreen';
import MapInput from './src/components/lcation/MapInput'
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#ff9800',
    // brandPrimary: '#ff9800',
    // brandInfo: '#ff9800',
    // brandSuccess: '#ff9800',
    // brandDanger: '#ff9800',
    // brandWarning: '#ff9800',
    // brandDark: '#ff9800',
    // brandLight: '#ff9800',

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




const VerifyStack = createStackNavigator(
  // Internet: { navigationOptions: { headerShown: false }, screen: InternetScreen },
  // HomeScreen: { navigationOptions: { headerShown: false }, screen: HomeScreen },
  {
    LoginPhoneScreen: {
      screen: LoginPhoneScreen,
      navigationOptions: {
        title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('login')} />,
        headerLeft: ({ navigation }) => (
          <Icon
            style={{ left: 15, color: '#ff9800' }}
            onPress={() => navigate('HomeScreenLogIn')}
            name="md-arrow-back"
            size={35}
          />
        ),
      }
    },
    VerifyScreen: {
      screen: VerifyScreen,
      navigationOptions: {
        title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('verify')} />,
        headerLeft: ({ navigation }) => (
          <Icon
            style={{ left: 15, color: '#ff9800' }}
            onPress={() => navigate('LoginPhoneScreen')}
            name="md-arrow-back"
            size={35}
          />
        ),
      }
    },
    RegisterUserScreen: {
      screen: RegisterUserScreen,
      navigationOptions: {
        title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('register')} />,
        headerLeft: ({ navigation }) => (
          <Icon
            style={{ left: 15, color: '#ff9800' }}
            onPress={() => navigate('VerifyScreen')}
            name="md-arrow-back"
            size={35}
          />
        ),
      }
    },
  },
  {
    initialRouteName: 'LoginPhoneScreen',
    defaultNavigationOptions: {
      headerShown: true
    }
  });

// const RegisterFlow = createSwitchNavigator({
//   VerifyFlow: { screen: VerifyStack },

// },
//   {
//     initialRouteName: 'VerifyFlow',
//     defaultNavigationOptions: {
//       headerShown: true
//     }
//   });




const HomeLoginStackNavigator = createStackNavigator(
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
          // backgroundColor: '#ff9800',
        },
        // headerTintColor: '#fff',
      }
    },
    RegisterFlow: { screen: VerifyStack, navigationOptions: { headerShown: false } },
  },
  {
    initialRouteName: 'HomeScreenLogIn',
    defaultNavigationOptions: {
      headerShown: true
    }
  });





const HomeStackNavigator = createStackNavigator(
  {
    HomeNavigator: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: '',
          headerLeft: () =>
            <Icon
              style={{ left: 15, color: '#ff9800' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={40}
            />,
          headerRight: () => (
            <SettingsButton />
          )
          ,
          headerStyle: {
            // backgroundColor: '#ff9800',
          },
          // headerTintColor: '#fff',
        };
      },
    },
    HomeCleaningScreen: {
      screen: HomeCleaningScreen,
      navigationOptions: {
        title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('homecleaning')} />,
        headerLeft: ({ navigation }) => (
          <Icon
            style={{ left: 15, color: '#ff9800' }}
            onPress={() => navigate('HomeNavigator')}
            name="md-arrow-back"
            size={35}
          />
        ),
      }
    },
    MapScreen: {
      screen: MapScreen,
      navigationOptions: {
        title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('mapScreen')} />,
        headerShown: false,
      }
    },
  });
const SettingStackNavigator = createStackNavigator(
  {
    SettingNavigator: {
      screen: SettingScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('settings')} />,
          headerLeft: () =>
            <Icon
              style={{ left: 15, color: '#ff9800' }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={40}
            />,
          headerStyle: {
            // backgroundColor: '#ff9800',
          },
          // headerTintColor: '#fff',
        };
      },
    },
    EditPersonalDetailsScreen: {
      screen: EditPersonalDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('editpersonaldetails'),
        // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#ff9800',
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
          backgroundColor: '#ff9800',
        },
        headerTintColor: '#fff',
      }),
    },
    ManageCreditCards: {
      screen: ManageCreditCards,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('managecreditcards'),
        // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#ff9800',
        },
        headerTintColor: '#fff',
      }),
    },
  });


const TabNavigator = createMaterialTopTabNavigator({
  Upcoming: {
    screen: UpcomingScreen,
    navigationOptions: {
      tabBarLabel: 'Upcoming',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name='update' color={tintColor} size={24} />
      )
    }
  },
  Past: {
    screen: PastScreen,
    navigationOptions: {
      tabBarLabel: 'Past',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome5 name='history' color={tintColor} size={18} />
      )
    }
  }
},
  {
    initialRouteName: 'Upcoming',
    tabBarPosition: "top",
    tabBarOptions: {
      activeTintColor: "#ff9800",
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: "#fff"
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: '#ff9800',
      },
      showIcon: true
    },
  }
);

const AppoitmentStackNavigator = createStackNavigator(
  {
    AppoitmentNavigator: TabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('appoitments')} />,
        headerLeft: () =>
          <Icon
            style={{ left: 15, color: '#ff9800' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={40}
          />,

        headerStyle: {
          // backgroundColor: '#ff9800',
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
        title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('freecleaning')} />,

        headerLeft: () =>
          <Icon
            style={{ left: 15, color: '#ff9800' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={40}
          />,

        headerStyle: {
          // backgroundColor: '#ff9800',
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
        title: <FontBold mystyle={{ left: 10, padding: 15, color: '#ff9800', fontSize: 20 }} value={i18n.t('support')} />,
        headerLeft: () =>
          <Icon
            style={{ left: 15, color: '#ff9800' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={40}
          />,

        headerStyle: {
          // backgroundColor: '#ff9800',
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
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value={i18n.t('home')} />,
      drawerIcon: <FontAwesome5 name="home" size={25} color="#fff" />
    },
  },
  SettingDrawerNavigator: {
    screen: SettingStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value={i18n.t('draweraccountsettings')} />,
      drawerIcon: <MaterialCommunityIcons name="account-settings" size={30} color="#fff" />
    },
  },
  AppointmentDrawerNavigator: {
    screen: AppoitmentStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value={i18n.t('appoitments')} />,
      drawerIcon: <Fontisto name="date" size={25} color="#fff" />
    },
  },
  FreeDrawerNavigator: {
    screen: FreeStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value={i18n.t('freecleaning')} />,
      drawerIcon: <MaterialCommunityIcons name="ticket-percent" size={25} color="#fff" />
    },
  },
  SupportDrawerNavigator: {
    screen: SupportStackNavigator,
    navigationOptions: {
      drawerLabel: <FontBold mystyle={{ left: 10, padding: 15, color: '#fff', fontSize: 20 }} value={i18n.t('support')} />,
      drawerIcon: <AntDesign name="message1" size={25} color="#fff" />
    },
  }
},
  // { edgeWidth: 20, drawerType: 'slide', overlayColor: 'red', },

  {
    navigationOptions: {
      gestureEnabled: true,
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




const MainFlow = createSwitchNavigator({
  LoginFlow: { screen: HomeLoginStackNavigator },
  Dashboard: { screen: AppDrawerNavigator },
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
export default withNamespaces()(({ t }) => {
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
)
