import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, Alert, Platform, Image, SafeAreaView, ImageBackground } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Permissions } from 'expo';

import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../api/token';
import { Context as HCContext } from './context/HCContext';
import { Context as UserContext } from './context/UserContext';
// import Loader from '../components/Loader';
import { getLang, storeLang } from '../api/userLanguage';
import FontBold from '../components/FontBold';
import FontLight from '../components/FontLight';
import FontRegular from '../components/FontRegular';
import { withNamespaces } from 'react-i18next';
import registerForPushNotifications from '../api/registerForPushNotifications';
import { Notifications } from 'expo';
import i18n from '../locales/i18n';

const InternetScreen = ({ navigation, t }) => {
  const { state: ustate, getUserDetails, getUserAddresses, dispatch: udispatch } = useContext(UserContext);
  const { state: hcstate, setHC, setBS, setDI, setDE, setSF, setMA, setCA, setCU, getServices, getUpcoming, getPast, dispatch: hcdispatch } = useContext(HCContext);

  const [loginToken, setLoginToken] = useState('');
  // const [isloading, setIsLoading] = useState(false);
  const [connected, setConnected] = useState(true);
  const ref = useRef(false)
  const { width, height } = Dimensions.get('window');

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     Notifications.createChannelAndroidAsync('default', {
  //       name: 'default',
  //       sound: true,
  //       priority: 'max',
  //       vibrate: [0, 250, 250, 250],
  //     });
  //   }
  // }, [])
  // useEffect(() => {
  //   let isCancelled = false;
  //   if (!isCancelled)
  //     registerForPushNotifications();
  //   return () => {
  //     isCancelled = true;
  //   };
  // }, [])
  // const [connected, setConnected] = useState(false);

  // const { getUserDetails, getUserAddresses } = useContext(UserContext);
  const fetchServices = async () => {
    await getServices().then((response) => {
      setHC(response[0]);
      setDI(response[10]);
      setDE(response[6]);
      setBS(response[11]);
      setSF(response[5]);
      setMA(response[4]);
      setCA(response[3]);
      setCU(response[2]);
      console.log("InterneteScreen::UseEffect::getServices::response::");
      console.log(response);
    }).catch((error) => {
      console.log("Error::InterneteScreen::UseEffect::getServices");
      console.log(error);
    });
  }
  const fetchAddresses = async () => {
    await getUserDetails().then((response) => {
      console.log("InterneteScreen::useffect::getUseDetails::response:: ");
      console.log(response);
      getUserAddresses().then((res) => {
        console.log("InterneteScreen::useffect::getUserAddresses::response:: ");
        console.log(res);
        udispatch({ type: 'set_user_addresses_loaded', payload: true });
        udispatch({ type: 'set_user_addresses', payload: res });
      }).catch((error) => {
        console.log("InterneteScreen::useffect::getUserAddresses::error:: ");
      });

      if (response.isVerified == 0)
        navigation.navigate('LoginFlow');
      else
        navigation.navigate('Dashboard');
    }).catch((error) => {
      console.log("InterneteScreen::getUserDetails#1 " + error);
    });
  }
  // const fetchUpcoming = async () => {
  //   getUpcoming().then((response) => {
  //     //console.log("Upcoming::useffect::getUpcoming::response:: ");
  //     //console.log("######################" + JSON.stringify(response));
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
  // const fetchPast = async () => {
  //   getPast().then((response) => {
  //     //console.log("Upcoming::useffect::getUpcoming::response:: ");
  //     //console.log("######################" + JSON.stringify(response));
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
  const fetchLoginToken = async () => {
    try {
      setLoginToken(await getToken());
      console.log("InternetScreen::tstInternetConnection::Saved token: ");
      console.log(typeof loginToken);
      console.log(await getToken());
    } catch (error) {
      // setIsLoading(false);
      console.log("Error::InternetScreen::testInternetConnection");
    }

  }
  useEffect(() => {
    let isCancelled1 = false;
    if (!isCancelled1) {
      // setIsLoading(true);
      fetchLoginToken();
    }
    getLang().then((response) => {
      console.log("InternetScreen:: selected Lang in Use Effect:  " + response);
      i18n.changeLanguage(response);
    }).catch(async (err) => {
      console.log("InternetScreen::Can not get lang");
      storeLang('en');
      // var dlng = await getLang();
      // console.log("InternetScreen::StoreLang::DefualtLang::" + dlng);
      i18n.changeLanguage('en');
    });
    return () => {
      isCancelled1 = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled2 = false;
    // setTimeout(() => {
    NetInfo.fetch().then(async (connection) => {
      console.log(connection)
      if (connection.isInternetReachable) {
        console.log("Connected");
        setConnected(true);
      }
      else {
        console.log("Not Connected");
        setConnected(false);
        if (!isCancelled2)
          // setIsLoading(false);
          return;
      }
      var token = await getToken();
      if (connected && (typeof (token) == 'undefined' || token == '')) {
        if (!isCancelled2)
          // setIsLoading(false);
          navigation.navigate('LoginFlow');
      }
      else if (connected && (typeof (token) != 'undefined')) {
        // if (!isCancelled2)
        // setIsLoading(false);
        await fetchServices();
        // await fetchUpcoming();
        // await fetchPast();
        await fetchAddresses();
        // if (isVerified == 0)
        //   navigation.navigate('LoginFlow');
        // else
        // navigation.navigate('Dashboard');
      }
      else {
        // setIsLoading(false);
      }
    })
    // }, 4000);

    return () => {
      isCancelled2 = true;
    };
  }, []);


  return (<View style={styles.container}>
    {/* <Loader loading={isloading} /> */}
    {
      connected ?
        <ImageBackground
          source={require('../../assets/Splash/newSplash.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        >
          <View style={styles.biglogo}>
            <Image resizeMode="contain" style={{ width: width * 0.7, height: (width * 0.7) / 1.8 }} source={require('../../assets/Splash/biglogo.png')} />
          </View>
        </ImageBackground>
        :
        <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image resizeMode="contain" style={{ width: width * 0.8, height: (width * 0.8) / 1.8 }} source={require('../../assets/nonet.png')} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <FontBold mystyle={{ color: "#fff", fontSize: 22 }} value={t('noconnection')} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <FontLight mystyle={{ width: "75%", color: "#fff", fontSize: 14, left: 5, textAlign: "center" }} value={t('pleasecheckyourinternetconnectionandtryagain')} />
          </View>
        </View>
      // <View>
      //   <Image style={{ width: width, height: height }} source={require('../../assets/Splash/Splash.png')} />
      //   <View style={{ flexDirection: "row", justifyContent: "center" }}>
      //     <Image style={styles.biglogo} source={require('../../assets/Splash/biglogo.png')} />
      //   </View>
      // </View>

    }
  </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5c500"
  },

  splash: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  biglogo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0
  }

});

export default withNamespaces()(InternetScreen);
