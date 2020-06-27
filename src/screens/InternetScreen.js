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


const InternetScreen = ({ navigation, t }) => {
  const [testToken, setTestToken] = useState('');
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
  const testLogin = async () => {

    try {
      setTestToken(await getToken());
      console.log("InternetScreen::tstInternetConnection::Saved token: ");
      console.log(typeof testToken);
      console.log(testToken);
    } catch (error) {
      // setIsLoading(false);
      console.log("Error::InternetScreen::testInternetConnection");
    }

  }
  useEffect(() => {
    let isCancelled1 = false;
    if (!isCancelled1) {

      // setIsLoading(true);
      testLogin();
    }
    getLang().then((response) => {
      console.log("logoutbutton selected Lang in Use Effect:  " + response);
      i18n.changeLanguage(response);
    }).catch((err) => {
      console.log("logoutbutton Screen Can not get lang");
    });
    return () => {
      isCancelled1 = true;
    };
  }, [])
  useEffect(() => {
    let isCancelled2 = false;
    // setTimeout(() => {
    NetInfo.fetch().then((connection) => {
      console.log(connection)
      if (connection.isConnected) {
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
      if (connected && (typeof (testToken) == 'undefined')) {
        if (!isCancelled2)
          // setIsLoading(false);
          navigation.navigate('LoginFlow');
      }
      else if (connected && (typeof (testToken) != 'undefined')) {
        if (!isCancelled2)
          // setIsLoading(false);
          navigation.navigate('Dashboard');
      }
      else {
        // setIsLoading(false);
      }
    })
    // }, 3000);

    return () => {
      isCancelled2 = true;
    };
  }, [testToken]);


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
