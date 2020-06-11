import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Button, ScrollView, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native';
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
const HomeScreen = ({ navigation, t }) => {
  const { getUserDetails, getUserAddresses, dispatch: udispatch } = useContext(UserContext);
  const { state: hcstate, setHC, setBS, getServices, getUpcoming, dispatch: hcdispatch } = useContext(HCContext);
  const { state, logout } = useContext(AuthContext);
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;
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
    getServices().then((response) => {
      setHC(response[0]);
      setBS(response[11]);
      console.log("HomeScreen::UseEffect::getServices::response::");
      console.log(response);
    }).catch((error) => {
      console.log("Error::HomeScreen::UseEffect::getServices");
      console.log(error);
    });

    getUserDetails().then((response) => {
      console.log("HomeScreen::useffect::getUseDetails::response:: ");
      console.log(response);
      getUserAddresses().then((res) => {
        console.log("HomeScreen::useffect::getUserAddresses::response:: ");
        console.log(res);
        udispatch({ type: 'set_user_addresses_loaded', payload: true });
        udispatch({ type: 'set_user_addresses', payload: res });
      }).catch((error) => {
        console.log("HomeScreen::useffect::getUserAddresses::error:: ");
      });
    }).catch((error) => {
      console.log("HomeScreen::getUserDetails#1 " + error);
    });

  }, []);

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
            <Text style={styles.cleaningservicetext}>
              <FontBold value={t('cleaningservicetext')} />
            </Text>
            <Text style={styles.cleaningservicedetailtext}>
              <FontRegular value={t('cleaningservicedetailtext')} />
            </Text>
          </TouchableOpacity>
        </View>
      </Spacer>
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
      <Spacer>
        <View style={styles.bottomcontainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('babysitter')} imagesource={require('../../assets/services/babysitter.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('disinfectionservices')} imagesource={require('../../assets/services/disinfection.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('fulltimemade')} imagesource={require('../../assets/services/fulltimemaid.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('laundary')} imagesource={require('../../assets/services/laundary.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('carwash')} imagesource={require('../../assets/services/carwash.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('deepcleaning')} imagesource={require('../../assets/services/deepcleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('sofacleaning')} imagesource={require('../../assets/services/sofacleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('matresscleaning')} imagesource={require('../../assets/services/matresscleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('carpetcleaning')} imagesource={require('../../assets/services/carpetcleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('curtaincleaning')} imagesource={require('../../assets/services/curtaincleaning.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"BabySitterScreen"} title={t('accleaning')} imagesource={require('../../assets/services/accleaning.jpg')} />
          </ScrollView>
        </View>
      </Spacer>
      <Spacer />
    </ScrollView>
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
    margin: 5,
    position: "absolute",
    bottom: 20,
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
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 25,
    color: '#7a7a7a'
  },
  cleaningservicetext: {
    margin: 5,
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
    margin: 5,
    position: "absolute",
    top: 85,
    left: 10,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'left',
    fontSize: 15,
    // fontFamily: 'Comfortaa-Regular',
    padding: 5,
    color: '#fff'
  }

});


export default withNamespaces()(HomeScreen);
