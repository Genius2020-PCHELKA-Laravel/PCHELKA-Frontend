import React, { Component } from 'react';
import { Text, Dimensions, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FontBold from './src/components/FontBold'
import FontRegular from './src/components/FontRegular'
import FontLight from './src/components/FontLight'
import HomeScreen from './src/screens/HomeScreen';
import { setNavigator } from './src/navigationRef';
import HomeCleaningScreen from './src/screens/HomeCleaningScreen';
import BabySitterScreen from './src/screens/BabySitterScreen';
import DisinfectionScreen from './src/screens/DisinfectionScreen';
import DeepCleaningScreen from './src/screens/DeepCleaningScreen';
import SofaCleaningScreen from './src/screens/SofaCleaningScreen';
import MattressCleaningScreen from './src/screens/MattressCleaningScreen';
import CarpetCleaningScreen from './src/screens/CarpetCleaningScreen';
import CurtainCleaningScreen from './src/screens/CurtainCleaningScreen';
import BookedScreen from './src/components/HomeCleaningSteps/BookedScreen'
import { Provider as AuthProvider } from './src/screens/context/AuthContext';
import { Provider as UserProvider } from './src/screens/context/UserContext';
import { Provider as HCProvider } from './src/screens/context/HCContext';
import { exp } from 'react-native-reanimated';
import InternetScreen from './src/screens/InternetScreen';
import SettingScreen from './src/screens/drawerScreens/SettingScreen';
// import AppoitmentScreen from './src/screens/drawerScreens/AppoitmentScreen';
import UpcomingScreen from './src/screens/drawerScreens/UpcomingScreen';
import PastScreen from './src/screens/drawerScreens/PastScreen';
// import UpcomingDetailsScreen from './src/screens/drawerScreens/UpcomingDetailsScreen';
import HCRescheduleScreen from './src/screens/drawerScreens/HCRescheduleScreen';
// import HCRescheduleReducedScreen from './src/screens/drawerScreens/HCRescheduleReducedScreen';
// import ReschedulePolicyScreen from './src/screens/drawerScreens/ReschedulePolicyScreen';
import RescheduledScreen from './src/screens/drawerScreens/RescheduledScreen';
import FreeScreen from './src/screens/drawerScreens/FreeScreen';
import SupportScreen from './src/screens/drawerScreens/SupportScreen';
import HomeScreenLogIn from './src/screens/HomeScreenLogIn';
// import AddressdetailsSettings from './src/screens/AddressdetailsSettings';
import LoginPhoneScreen from './src/screens/LoginPhoneScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import RegisterUserScreen from './src/screens/RegisterUserScreen';
import Slidebar from './src/components/SlideBar';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutButton from './src/components/LogoutButton';
import SettingsButton from './src/components/SettingsButton';
import LoginButton from './src/components/LoginButton';
import LanguageButton from './src/components/LanguageButton';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import EditPersonalDetailsScreen from './src/screens/drawerScreens/EditPersonalDetailsScreen';
import ChangeMobileVerifyScreen from './src/screens/drawerScreens/ChangeMobileVerifyScreen';
import ManageAddresses from './src/screens/drawerScreens/ManageAddresses';
// import ManageCreditCards from './src/screens/drawerScreens/ManageCreditCards';
const SCREEN_WIDTH = Dimensions.get('window').width;
import { navigate } from './src/navigationRef';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { withNamespaces } from 'react-i18next';
import i18n from './src/locales/i18n';
import MapScreen from './src/screens/MapScreen';
import MapScreenShowAddress from './src/screens/MapScreenShowAddress';
import MapInput from './src/components/lcation/MapInput'
import { Normalize, fontNormalize } from './src/components/actuatedNormalize';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f5c500',
    accent: '#f5c500',
    // brandPrimary: '#f5c500',
    // brandInfo: '#f5c500',
    // brandSuccess: '#f5c500',
    // brandDanger: '#f5c500',
    // brandWarning: '#f5c500',
    // brandDark: '#f5c500',
    // brandLight: '#f5c500',

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
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('login')} />,
        headerLeft: ({ navigation }) => (
          <Icon
            style={{ left: Normalize(15), color: '#f5c500' }}
            onPress={() => navigate('HomeScreenLogIn')}
            name="md-arrow-back"
            size={Normalize(35)}
          />
        ),
      })
    },
    VerifyScreen: {
      screen: VerifyScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('verify')} />,
        headerLeft: ({ navigation }) => (
          <Icon
            style={{ left: Normalize(15), color: '#f5c500' }}
            onPress={() => navigate('LoginPhoneScreen')}
            name="md-arrow-back"
            size={Normalize(35)}
          />
        ),
      })
    },
    RegisterUserScreen: {
      screen: RegisterUserScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('register')} />,
        headerLeft: ({ navigation }) => (
          <Icon
            style={{ left: Normalize(15), color: '#f5c500' }}
            onPress={() => navigate('VerifyScreen')}
            name="md-arrow-back"
            size={Normalize(35)}
          />
        ),
      })
    },
  },
  {
    initialRouteName: 'LoginPhoneScreen',
    defaultNavigationOptions: () => ({
      headerShown: true
    })
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
      navigationOptions: () => ({
        title: '',
        headerRight: () => (<LoginButton />),
        headerLeft: () => (<LanguageButton />),
        headerStyle: {
          // backgroundColor: '#f5c500',
        },
        // headerTintColor: '#fff',
      }),
    },
    RegisterFlow: { screen: VerifyStack, navigationOptions: { headerShown: false } },
  },
  {
    initialRouteName: 'HomeScreenLogIn',
    defaultNavigationOptions: () => ({
      headerShown: true
    })
  });





const HomeStackNavigator = createStackNavigator(
  {
    HomeNavigator: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: '',
          headerLeft: () =>
            <Ionicons
              style={{ left: Normalize(15), color: '#f5c500', }}
              onPress={() => navigation.openDrawer()}
              name="ios-menu" size={Normalize(35)} />
          ,
          headerRight: () => (
            <SettingsButton />
          )
          ,
          headerStyle: {
            // backgroundColor: '#f5c500',
          },
          // headerTintColor: '#fff',
        };
      },
    },
    HomeCleaningScreen: {
      screen: HomeCleaningScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('homecleaning')} />,
        headerLeft: ({ navigation }) => (
          <FontAwesome5
            style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={Normalize(25)}
          />
        ),
      })
    },
    BabySitterScreen: {
      screen: BabySitterScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('babysitter')} />,
        headerLeft: ({ navigation }) => (
          <FontAwesome5
            style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={Normalize(25)}
          />
        ),
      })
    },
    DisinfectionScreen: {
      screen: DisinfectionScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('disinfection')} />,
        headerLeft: ({ navigation }) => (
          <FontAwesome5
            style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={Normalize(25)}
          />
        ),
      })
    },
    DeepCleaningScreen: {
      screen: DeepCleaningScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('deepcleaning')} />,
        headerLeft: ({ navigation }) => (
          <FontAwesome5
            style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={Normalize(25)}
          />
        ),
      })
    },
    SofaCleaningScreen: {
      screen: SofaCleaningScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('sofacleaning')} />,
        headerLeft: ({ navigation }) => (
          <FontAwesome5
            style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={Normalize(25)}
          />
        ),
      })
    },
    MattressCleaningScreen: {
      screen: MattressCleaningScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('mattresscleaning')} />,
        headerLeft: ({ navigation }) => (
          <FontAwesome5
            style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={Normalize(25)}
          />
        ),
      })
    },
    CarpetCleaningScreen: {
      screen: CarpetCleaningScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('carpetcleaning')} />,
        headerLeft: ({ navigation }) => (
          <FontAwesome5
            style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={Normalize(25)}
          />
        ),
      })
    },
    CurtainCleaningScreen: {
      screen: CurtainCleaningScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('curtaincleaning')} />,
        headerLeft: ({ navigation }) => (
          <FontAwesome5
            style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
            onPress={() => navigate('HomeNavigator')}
            name="home"
            size={Normalize(25)}
          />
        ),
      })
    },
    MapScreen: {
      screen: MapScreen,
      navigationOptions: () => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('mapScreen')} />,
        headerShown: false,
      })
    },
    MapScreenShowAddress: {
      screen: MapScreenShowAddress,
      navigationOptions: ({ navigation }) => ({
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('mapScreen')} />,
        headerShown: false,
      })
    },
    BookedScreen: {
      screen: BookedScreen,
      // navigationOptions: {
      //   title: <FontBold mystyle={{  color: '#f5c500', fontSize: 20 }} value={i18n.t('booked')} />,
      //   headerShown: false,
      // },
      navigationOptions: ({ navigation }) => {
        return {
          title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('booked')} />,
          headerLeft: () =>
            <FontAwesome5
              style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
              onPress={() => navigate('HomeNavigator')}
              name="home"
              size={Normalize(25)}
            />,
          headerStyle: {
            // backgroundColor: '#f5c500',
          },
          // headerTintColor: '#fff',
        };
      },
    },
  },
  {
    initialRouteName: 'HomeNavigator',
    defaultNavigationOptions: {
      ...TransitionPresets.ModalSlideFromBottomIOS,
      cardOverlayEnabled: true,
      gestureEnabled: true,
    },
  }
);
const SettingStackNavigator = createStackNavigator(
  {
    SettingNavigator: {
      screen: SettingScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('settings')} />,
          headerLeft: () =>
            <Ionicons
              style={{ left: Normalize(15), top: Normalize(5), color: '#f5c500' }}
              onPress={() => navigation.openDrawer()}
              name="ios-menu"
              size={Normalize(35)}
            />,
          // <FontAwesome5
          //   style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
          //   onPress={() => navigate('HomeNavigator')}
          //   name="home"
          //   size={Normalize(25)}
          // />,
          headerStyle: {
            // backgroundColor: '#f5c500',
          },
          // headerTintColor: '#fff',
        };

      },
    },
    EditPersonalDetailsScreen: {
      screen: EditPersonalDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        // title: i18n.t('editpersonaldetails'),
        title: <FontBold mystyle={{ color: '#fff', fontSize: fontNormalize(20) }} value={i18n.t('editpersonaldetails')} />,
        // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#f5c500',
        },
        headerLeftContainerStyle: {
          top: Normalize(5)
        },
        headerTintColor: '#fff',
      }),
    },
    ChangeMobileVerifyScreen: {
      screen: ChangeMobileVerifyScreen,
      navigationOptions: ({ navigation }) => ({
        // title: i18n.t('editpersonaldetails'),
        title: <FontBold mystyle={{ color: '#fff', fontSize: fontNormalize(20) }} value={i18n.t('verify')} />,
        // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#f5c500',
        },
        headerTintColor: '#fff',
      }),
    },
    ManageAddresses: {
      screen: ManageAddresses,
      navigationOptions: ({ navigation }) => ({
        // title: 'Manage Addresses',
        title: <FontBold mystyle={{ color: '#fff', fontSize: fontNormalize(20) }} value={i18n.t('manageaddresses')} />,
        // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#f5c500',
        },
        headerLeftContainerStyle: {
          top: Normalize(5)
        },
        headerTintColor: '#fff',
      }),
    },
    // ManageCreditCards: {
    //   screen: ManageCreditCards,
    //   navigationOptions: ({ navigation }) => ({
    //     // title: i18n.t('managecreditcards'),
    //     title: <FontBold mystyle={{ color: '#fff', fontSize: fontNormalize(20) }} value={i18n.t('managecreditcards')} />,
    //     // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
    //     headerStyle: {
    //       backgroundColor: '#f5c500',
    //     },
    //     headerLeftContainerStyle: {
    //       top: Normalize(5)
    //     },
    //     headerTintColor: '#fff',
    //   }),
    // },
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.ModalSlideFromBottomIOS,
      cardOverlayEnabled: true,
      gestureEnabled: true,
    },
  }
);


const TabNavigator = createMaterialTopTabNavigator({
  Upcoming: {
    screen: UpcomingScreen,
    navigationOptions: () => ({
      tabBarLabel: i18n.t('upcoming'),
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name='update' color={tintColor} size={Normalize(24)} />
      )
    })
  },
  Past: {
    screen: PastScreen,
    navigationOptions: () => ({
      tabBarLabel: i18n.t('past'),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome5 name='history' color={tintColor} size={Normalize(18)} />
      )
    })
  }
},
  {
    initialRouteName: 'Upcoming',
    tabBarPosition: "top",
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: "#fff"
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: '#000',
      },
      labelStyle: {
        fontSize: fontNormalize(14),
        margin: 0,
        padding: 0
      },
      showIcon: true
    },
  }
);


const AppoitmentStackNavigator = createStackNavigator(
  {
    AppoitmentNavigator: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('appoitments')} />,
          headerLeft: () =>
            <Ionicons
              style={{ left: Normalize(15), top: Normalize(5), color: '#f5c500' }}
              onPress={() => navigation.openDrawer()}
              name="ios-menu"
              size={Normalize(35)}
            />,
          // <FontAwesome5
          //   style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
          //   onPress={() => navigate('HomeNavigator')}
          //   name="home"
          //   size={Normalize(25)}
          // />,
          headerStyle: {
            // backgroundColor: '#f5c500',
          },
          // headerTintColor: '#fff',
        };
      },
    },
    // HCUpcomingDetails: {
    //   screen: UpcomingDetailsScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     title: <FontBold mystyle={{ color: '#fff', fontSize: 20 }} value={i18n.t('reschedule') + " " + i18n.t('appoitment')} />,
    //     headerStyle: {
    //       backgroundColor: '#f5c500',
    //     },
    //     headerLeftContainerStyle: {
    //       top: Normalize(5)
    //     },
    //     headerTintColor: '#fff',
    //   }),
    // },
    HCReschedule: {
      screen: HCRescheduleScreen,
      navigationOptions: ({ navigation }) => ({
        title: <FontBold mystyle={{ color: '#fff', fontSize: fontNormalize(20) }} value={i18n.t('dateandtime')} />,
        headerStyle: {
          backgroundColor: '#f5c500',
        },
        headerLeftContainerStyle: {
          top: Normalize(5)
        },
        headerTintColor: '#fff',
      }),
    },
    // HCRescheduleReduced: {
    //   screen: HCRescheduleReducedScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     title: <FontBold mystyle={{ color: '#fff', fontSize: 20 }} value={i18n.t('dateandtime')} />,
    //     headerStyle: {
    //       backgroundColor: '#f5c500',
    //     },
    //     headerLeftContainerStyle: {
    //       top: Normalize(5)
    //     },
    //     headerTintColor: '#fff',
    //   }),
    // },
    // ReschedulePolicy: {
    //   screen: ReschedulePolicyScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     title: <FontBold mystyle={{ color: '#fff', fontSize: 20 }} value={i18n.t('ourpolicy')} />,
    //     headerStyle: {
    //       backgroundColor: '#f5c500',
    //     },
    //     headerLeftContainerStyle: {
    //       top: Normalize(5)
    //     },
    //     headerTintColor: '#fff',
    //   }),
    // },
    RescheduledScreen: {
      screen: RescheduledScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('rescheduled')} />,
          headerLeft: () =>
            <FontAwesome5
              style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
              onPress={() => navigate('Upcoming')}
              name="home"
              size={Normalize(25)}
            />,
          headerStyle: {
            // backgroundColor: '#f5c500',
          },
          // headerTintColor: '#fff',
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.ModalSlideFromBottomIOS,
      cardOverlayEnabled: true,
      gestureEnabled: true,
    },
  }
);
const FreeStackNavigator = createStackNavigator(
  {
    FreeNavigator: FreeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('freecleaning')} />,

        headerLeft: () =>
          <Ionicons
            style={{ left: Normalize(15), top: Normalize(5), color: '#f5c500' }}
            onPress={() => navigation.openDrawer()}
            name="ios-menu"
            size={Normalize(35)}
          />,
        // <FontAwesome5
        //   style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
        //   onPress={() => navigate('HomeNavigator')}
        //   name="home"
        //   size={Normalize(25)}
        // />,

        headerStyle: {
          // backgroundColor: '#f5c500',
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
        title: <FontBold mystyle={{ color: '#000', fontSize: fontNormalize(20) }} value={i18n.t('support')} />,
        headerLeft: () =>
          <Ionicons
            style={{ left: Normalize(15), top: Normalize(5), color: '#f5c500' }}
            onPress={() => navigation.openDrawer()}
            name="ios-menu"
            size={Normalize(35)}
          />,
        // <FontAwesome5
        //   style={{ left: Normalize(15), top: Normalize(3), color: '#f5c500' }}
        //   onPress={() => navigate('HomeNavigator')}
        //   name="home"
        //   size={Normalize(25)}
        // />,

        headerStyle: {
          // backgroundColor: '#f5c500',
        },
        // headerTintColor: '#fff',
      };
    }
  }
);
// const drawerAnimationStackNavigator = createStackNavigator(
//   {
//     drawerAnimationHomeStackNavigator: HomeStackNavigator,
//     drawerAnimationSettingStackNavigator: SettingStackNavigator,
//     drawerAnimationAppoitmentStackNavigator: AppoitmentStackNavigator,
//     drawerAnimationFreeStackNavigator: FreeStackNavigator,
//     drawerAnimationSupportStackNavigator: SupportStackNavigator,
//   },
//   {
//     initialRouteName: 'drawerAnimationHomeStackNavigator',
//     defaultNavigationOptions: {
//       ...TransitionPresets.ModalSlideFromBottomIOS,
//       cardOverlayEnabled: true,
//       gestureEnabled: true,
//     },
//   }
// );
const AppDrawerNavigator = createDrawerNavigator({
  HomeDrawerNavigator: {
    screen: HomeStackNavigator,
    navigationOptions: () => ({
      drawerLabel: <FontBold mystyle={{ left: Normalize(5), padding: Normalize(20), color: '#fff', fontSize: fontNormalize(16) }} value={i18n.t('home')} />,
      drawerIcon: <FontAwesome5 name="home" size={Normalize(20)} color="#fff" />
    }),
  },
  SettingDrawerNavigator: {
    screen: SettingStackNavigator,
    navigationOptions: () => ({
      drawerLabel: <FontBold mystyle={{ left: Normalize(5), padding: Normalize(20), color: '#fff', fontSize: fontNormalize(16), }} value={i18n.t('draweraccountsettings')} />,
      drawerIcon: <MaterialCommunityIcons name="account-settings" size={Normalize(25)} color="#fff" />
    }),
  },
  AppointmentDrawerNavigator: {
    screen: AppoitmentStackNavigator,
    navigationOptions: () => ({
      drawerLabel: <FontBold mystyle={{ left: Normalize(5), padding: Normalize(20), color: '#fff', fontSize: fontNormalize(16) }} value={i18n.t('appoitments')} />,
      drawerIcon: <Fontisto name="date" size={Normalize(20)} color="#fff" />
    }),
  },
  // FreeDrawerNavigator: {
  //   screen: FreeStackNavigator,
  //   navigationOptions: () => ({
  //     drawerLabel: <FontBold mystyle={{ left: 5, padding: 20, color: '#fff', fontSize: 16 }} value={i18n.t('freecleaning')} />,
  //     drawerIcon: <MaterialCommunityIcons name="ticket-percent" size={20} color="#fff" />
  //   }),
  // },
  SupportDrawerNavigator: {
    screen: SupportStackNavigator,
    navigationOptions: () => ({
      drawerLabel: <FontBold mystyle={{ left: Normalize(5), padding: Normalize(20), color: '#fff', fontSize: fontNormalize(16), }} value={i18n.t('support')} />,
      drawerIcon: <AntDesign name="message1" size={Normalize(20)} color="#fff" />
    }),
  },
},
  // { edgeWidth: 20, drawerType: 'slide', overlayColor: 'red', },

  {
    navigationOptions: () => ({
      gestureEnabled: true,
      mode: 'modal',
    }),
    initialRouteName: "HomeDrawerNavigator",
    contentOptions: {
      // activeTintColor: "#e91e63"
    },
    drawerWidth: SCREEN_WIDTH * 0.70,
    drawerPosition: 'left',
    drawerType: 'slide',
    edgeWidth: Normalize(25),
    overlayColor: '00FFFFF',

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
