import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Button, ScrollView, SafeAreaView, Image, TouchableOpacity, Dimensions, Vibration, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Servicesdetails from '../components/Servicesdetails';
import i18n from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { AsyncStorage } from "react-native";
import Spacer from '../components/Spacer';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Slider from '../components/Slider';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
import { Context as AuthContext } from './context/AuthContext';
import { Context as UserContext } from './context/UserContext';
import { Context as HCContext } from './context/HCContext';
import { navigate } from '../navigationRef';
import NotificationsComponent from '../components/NotificationsComponent';
import { BackHandler } from 'react-native';
import ExitDialog from '../components/ExitDialog';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { initnotify, getToken, newChannel, notify } from 'expo-push-notification-helper';
import OfflineNotice from '../components/OfflineNotice';
import { getStorageExpoToken, setStorageExpoToken, removeStorageExpoToken } from '../api/token';
const HomeScreen = ({ navigation, t }) => {
  const { getUserDetails, getUserAddresses, dispatch: udispatch, getNotificationFromServer, subscribeToNotification, unsubscribeToNotification } = useContext(UserContext);
  const { state: hcstate, setHC, setBS, setDI, setDE, setSF, setMA, setCA, setCU, getServices, getUpcoming, getPast, dispatch: hcdispatch } = useContext(HCContext);
  const { state, logout } = useContext(AuthContext);
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 12 / 16);
  const imageWidth = dimensions.width;
  const [changing, setChanging] = useState(false);
  const [notification, setNotification] = useState('');
  // const [expoToken, setExpoToken] = useState('');

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      await Notifications.createChannelAndroidAsync('PCHELKA-CLEANING', {
        name: 'PCHELKA-CLEANING',
        sound: true,
        priority: 'high',
        vibrate: [0, 250, 250, 250],
      });
    }
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      //await setStorageExpoToken('ExponentPushToken[MvcYILJyHS34NhC0vmcMYx]');
      //await subscribeToNotification({ expo_token: 'ExponentPushToken[MvcYILJyHS34NhC0vmcMYx]' });
      try {
        alert("before")
        token = await Notifications.getExpoPushTokenAsync();
        alert("after")
        alert(token);
        //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + token);
        //alert(token);
        await setStorageExpoToken(token);
        await subscribeToNotification({ expo_token: token });
        // setExpoToken(token);
      } catch (err) {
        console.log("@@@@@@@@@@@@@@@ :: " + err)
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  const _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    setNotification(notification);
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    // initnotify().then(async (data) => {
    //   if (data) {
    //     setExpoToken(await getToken());
    //     console.log("ExpoToken" + expoToken);
    //     alert(expoToken);
    //   } else {
    //     alert('please grant this app notification permission in settings.')
    //   }
    // });
    // newChannel("GroupMessage");
    // notify(expoToken, "new message", "hello there how are you doing", "default")

    Notifications.addListener(_handleNotification);

  }, []);
  // const [testToken, setTestToken] = useState('');

  // getData = async () => {
  //   try {
  //     setTestToken(await getToken());
  //     console.log("Get Data: " + token);
  //   } catch (e) {
  //     console.log("error in token" + e);
  //   }
  // }
  useEffect(() => {
    //hcdispatch({ type: 'RESET' });
    // getServices().then((response) => {
    //   setHC(response[0]);
    //   setDI(response[10]);
    //   setDE(response[6]);
    //   setBS(response[11]);
    //   setSF(response[5]);
    //   setMA(response[4]);
    //   setCA(response[3]);
    //   setCU(response[2]);
    //   console.log("HomeScreen::UseEffect::getServices::response::");
    //   console.log(response);
    // }).catch((error) => {
    //   console.log("Error::HomeScreen::UseEffect::getServices");
    //   console.log(error);
    // });

    // getUserDetails().then((response) => {
    //   console.log("HomeScreen::useffect::getUseDetails::response:: ");
    //   console.log(response);
    //   getUserAddresses().then((res) => {
    //     console.log("HomeScreen::useffect::getUserAddresses::response:: ");
    //     console.log(res);
    //     udispatch({ type: 'set_user_addresses_loaded', payload: true });
    //     udispatch({ type: 'set_user_addresses', payload: res });
    //   }).catch((error) => {
    //     console.log("HomeScreen::useffect::getUserAddresses::error:: ");
    //   });
    // }).catch((error) => {
    //   console.log("HomeScreen::getUserDetails#1 " + error);
    // });

    // getUpcoming().then((response) => {
    //   //console.log("Upcoming::useffect::getUpcoming::response:: ");
    //   //console.log("######################" + JSON.stringify(response));
    // }).catch((error) => {
    //   console.log(error);
    // });
    // getPast().then((response) => {
    //   //console.log("Upcoming::useffect::getUpcoming::response:: ");
    //   //console.log("######################" + JSON.stringify(response));
    // }).catch((error) => {
    //   console.log(error);
    // });

  }, []);
  const unsubscribe = navigation.addListener('didFocus', () => {
    console.log("HomeScreen::didFocus");
    hcdispatch({ type: 'RESET' });
    BackHandler.addEventListener('hardwareBackPress', () => { setChanging(true); return true; });
  });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { setChanging(true); return true; });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => { setChanging(false); return true; });
    };
  }, []);
  useEffect(() => {
    getUpcoming().then((response) => {
      console.log("Upcoming::useffect::getUpcoming::response:: ");
      console.log("######################" + JSON.stringify(response));
    }).catch((error) => {
      console.log(error.response);
    });
    getPast().then((response) => {
      //console.log("Upcoming::useffect::getUpcoming::response:: ");
      //console.log("######################" + JSON.stringify(response));
    }).catch((error) => {
      console.log(error.response);
    });
  }, [hcstate.reloadAppointments]);
  // useEffect(() => {
  //   getUpcoming().then((response) => {
  //     console.log("HomeScreen::useffect::getUpcoming::response:: ");
  //     console.log("######################" + JSON.stringify(response));
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }, []);
  // useEffect(() => {
  //   getUpcoming().then((response) => {
  //     console.log("HomeScreen::useffect::getUpcoming::response:: ");
  //     console.log("######################" + JSON.stringify(response));
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }, [hcstate.reloadAppointments]);
  //const [dropdownContents, setDropdownContents] = useState('');
  return (<>
    <ScrollView style={styles.container}>
      <ExitDialog changing={changing} setChanging={setChanging} />
      <Slider style={{ height: imageHeight, width: imageWidth }} />
      <Spacer>
        <View style={styles.middlecontainer1}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeCleaningScreen', { redirect: "Dashboard" })}>
            <Image resizeMethod='auto' style={{ opacity: 0.5, backgroundColor: 'black', borderRadius: 7, height: imageHeight, width: imageWidth - 20, marginLeft: 5, marginRight: 5 }} source={require('../../assets/services/homecleaning.jpg')} />
            <Text style={styles.booknowButtonStyle}>
              <FontBold value={t('booknow')}>
              </FontBold>{' '}
              <FontAwesome5 name="chevron-right" size={15} color="#7a7a7a" />
            </Text>
            <FontBold value={t('cleaningservicetext')} mystyle={styles.cleaningservicetext} />
            <FontRegular value={t('cleaningservicedetailtext')} mystyle={styles.cleaningservicedetailtext} />
          </TouchableOpacity>
        </View>
      </Spacer>
      {/* <View>
        <TouchableOpacity onPress={async () => {
          //await subscribeToNotification({ expo_token: 'ExponentPushToken[rplFsYMBUnIcHy8J-jPsXV]' });
          await subscribeToNotification({ expo_token: 'ExponentPushToken[MvcYILJyHS34NhC0vmcMYx]' });
          getNotificationFromServer();
        }}>
          <Spacer>
            <Text>subscribe and get notification</Text>
          </Spacer>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          ////old android app
          //await unsubscribeToNotification({ expo_token: 'ExponentPushToken[rplFsYMBUnIcHy8J-jPsXV]' });
          /////android build
          //await unsubscribeToNotification({ expo_token: 'ExponentPushToken[FBUTilDBNd-yFQBOHmoy5S]' });
          //new Android App
          await unsubscribeToNotification({ expo_token: 'ExponentPushToken[MvcYILJyHS34NhC0vmcMYx]' });
          // await unsubscribeToNotification({ expo_token: expoToken });
        }}>
          <Spacer>
            <Text>unsubscribe</Text>
          </Spacer>
        </TouchableOpacity>
      </View> */}
      <Spacer>
        <View style={styles.everthingtext}>
          <Text style={styles.everthingtext}>
            <FontLight value={t('everthingtext')} />
          </Text>
        </View>
        <View style={styles.middlecontainer3}>
          <Text style={styles.homescreentext}>
            <FontBold value={t('homescreentext')} />
          </Text>
        </View>
      </Spacer>
      {/* <NotificationsComponent /> */}

      <Spacer>
        <View style={styles.bottomcontainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"DisinfectionScreen"} trending="no" biosafe="yes" comming="no" title={t('disinfectionservices')} imagesource={require('../../assets/services/disinfection.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} trending="yes" biosafe="no" comming="no" title={t('babysitter')} imagesource={require('../../assets/services/babysitter.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={""} biosafe="no" trending="no" comming="yes" title={t('fulltimemade')} imagesource={require('../../assets/services/fulltimemaid.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"CarpetCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('carpetcleaning')} imagesource={require('../../assets/services/carpetcleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={""} biosafe="no" trending="no" comming="yes" title={t('laundary')} imagesource={require('../../assets/services/laundary.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"DeepCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('deepcleaning')} imagesource={require('../../assets/services/deepcleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"CurtainCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('curtaincleaning')} imagesource={require('../../assets/services/curtaincleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={""} trending="no" biosafe="no" comming="yes" title={t('carwash')} imagesource={require('../../assets/services/carwash.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"MattressCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('mattresscleaning')} imagesource={require('../../assets/services/matresscleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"SofaCleaningScreen"} trending="no" biosafe="no" comming="no" title={t('sofacleaning')} imagesource={require('../../assets/services/sofacleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={""} trending="no" biosafe="no" comming="yes" title={t('accleaning')} imagesource={require('../../assets/services/accleaning.jpg')} />
          </ScrollView>
        </View>
      </Spacer>
      <Spacer />
    </ScrollView>
    <OfflineNotice />

  </>)
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  everthingtext: {
    fontSize: 15,
    color: '#b4b4b4',
  },
  homescreentext: {
    fontSize: 24,
  },
  servicetext: {
    fontSize: 14,
    fontWeight: "500",
    // fontFamily: 'Comfortaa-Light'
  },
  topcontainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  middlecontainer1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middlecontainer2: {
    margin: 5,
  },
  middlecontainer3: {
    margin: 5,
  },
  bottomcontainer: {
    margin: 0
  },
  topButtonStyle: {
    padding: 5,
    //backgroundColor:'#DAA520',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DAA520',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: "500",
    // fontFamily: 'Comfortaa-Bold'
  },
  booknowButtonStyle: {
    position: "absolute",
    bottom: 60,
    left: 10,
    height: 35,
    backgroundColor: '#f5c500',
    padding: 5,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: '#7a7a7a',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 25,
    color: '#7a7a7a'
  },
  cleaningservicetext: {
    marginTop: 20,
    position: "absolute",
    top: 45,
    left: 10,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 34,
    fontWeight: "900",
    // fontFamily: 'Comfortaa-Bold',
    padding: 5,
    color: '#fff',
    fontWeight: "bold"
  },
  cleaningservicedetailtext: {
    marginTop: 40,
    position: "absolute",
    top: 85,
    left: 10,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'left',
    fontSize: 15,
    // fontFamily: 'Comfortaa-Regular',
    padding: 5,
    color: '#fff',
    lineHeight: 25
  }

});


export default withNamespaces()(HomeScreen);
