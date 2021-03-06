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
import { getToken } from '../api/token';
import NetInfo from '@react-native-community/netinfo';
import { navigate } from '../navigationRef';
import { BackHandler } from 'react-native';
import ExitDialog from '../components/ExitDialog';
import OfflineNotice from '../components/OfflineNotice';
import { Normalize, fontNormalize } from '../components/actuatedNormalize';

const HomeScreenLogIn = ({ navigation, t }) => {
  const { state, logout } = useContext(AuthContext);
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 12 / 16);
  const imageWidth = dimensions.width;
  const [changing, setChanging] = useState(false);
  const unsubscribe = navigation.addListener('didFocus', () => {
    BackHandler.addEventListener('hardwareBackPress', () => { setChanging(true); return true; });
  });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { setChanging(true); return true; });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => { setChanging(false); return true; });
    };
  }, []);
  return (<>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ExitDialog changing={changing} setChanging={setChanging} />
      <Slider style={{ height: imageHeight, width: imageWidth }} />
      <Spacer>
        <View style={styles.middlecontainer1}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPhoneScreen', { redirect: "HomeCleaningScreen" })}>
            <Image resizeMethod='auto' style={{ opacity: 0.8, backgroundColor: 'black', borderRadius: 7, height: imageHeight, width: imageWidth - Normalize(20), marginLeft: Normalize(5), marginRight: Normalize(5) }} source={require('../../assets/services/homecleaning.jpg')} />
            <Text style={styles.booknowButtonStyle}>
              <FontBold value={t('booknow') + " "} mystyle={{ textAlignVertical: "center" }}>
              </FontBold>{' '}
              <FontAwesome5 name="chevron-right" size={Normalize(15)} color="#7a7a7a" />
            </Text>
            <FontBold value={t('cleaningservicetext')} mystyle={styles.cleaningservicetext} />
            <FontRegular value={t('cleaningservicedetailtext')} mystyle={styles.cleaningservicedetailtext} />
          </TouchableOpacity>
        </View>
      </Spacer>
      <Spacer>
        <View style={styles.everthingtext}>
          <Text style={styles.everthingtext}>
            <FontBold value={t('everthingtext')} />
          </Text>
        </View>
        <View style={styles.middlecontainer3}>
          <FontBold value={t('homescreentext')} mystyle={styles.homescreentext} />
        </View>
      </Spacer>
      <Spacer>
        <View style={styles.bottomcontainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: Normalize(10) }}>
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={"DisinfectionScreen"} trending="no" biosafe="yes" comming="no" title={t('disinfectionservices')} imagesource={require('../../assets/services/disinfection.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={"CarpetCleaningScreen"} biosafe="no" trending="no" comming="no" title={t('carpetcleaning')} imagesource={require('../../assets/services/carpetcleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={"CurtainCleaningScreen"} biosafe="no" trending="no" comming="no" title={t('curtaincleaning')} imagesource={require('../../assets/services/curtaincleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={"SofaCleaningScreen"} biosafe="no" trending="no" comming="no" title={t('sofacleaning')} imagesource={require('../../assets/services/sofacleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={""} biosafe="no" trending="no" comming="yes" title={t('carwash')} imagesource={require('../../assets/services/carwash.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={""} biosafe="no" trending="no" comming="yes" title={t('accleaning')} imagesource={require('../../assets/services/accleaning.jpg')} />

            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: Normalize(10) }}>
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={"BabySitterScreen"} trending="yes" biosafe="no" comming="no" title={t('babysitter')} imagesource={require('../../assets/services/babysitter.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={"DeepCleaningScreen"} biosafe="no" trending="no" comming="no" title={t('deepcleaning')} imagesource={require('../../assets/services/deepcleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={"MattressCleaningScreen"} biosafe="no" trending="no" comming="no" title={t('mattresscleaning')} imagesource={require('../../assets/services/matresscleaning.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={""} biosafe="no" trending="no" comming="yes" title={t('fulltimemade')} imagesource={require('../../assets/services/fulltimemaid.jpg')} />
              <Servicesdetails contentContainerStyle={{ alignItems: "center" }} nav={"LoginPhoneScreen"} redirect={""} biosafe="no" trending="no" comming="yes" title={t('laundary')} imagesource={require('../../assets/services/laundary.jpg')} />

            </View>
          </View>




          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          </ScrollView> */}
        </View>
      </Spacer>
    </ScrollView>
    <OfflineNotice />
  </>)
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  everthingtext: {
    fontSize: fontNormalize(12),
    color: '#b4b4b4',
  },
  homescreentext: {
    fontSize: fontNormalize(18),
  },
  servicetext: {
    fontSize: fontNormalize(14),
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
    margin: Normalize(5),
  },
  middlecontainer3: {
    margin: Normalize(5),
  },
  bottomcontainer: {
    margin: 0
  },
  topButtonStyle: {
    padding: Normalize(5),
    //backgroundColor:'#DAA520',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DAA520',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: fontNormalize(12),
    fontWeight: "500",
    // fontFamily: 'Comfortaa-Bold'
  },
  booknowButtonStyle: {
    position: "absolute",
    bottom: Normalize(40),
    left: Normalize(10),
    height: Normalize(35),
    backgroundColor: '#f5c500',
    padding: Normalize(5),
    borderRadius: 4,
    borderWidth: 0,
    borderColor: '#7a7a7a',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: fontNormalize(16),
    fontWeight: "500",
    paddingHorizontal: Normalize(25),
    color: '#7a7a7a'
  },
  cleaningservicetext: {
    marginTop: Normalize(20),
    position: "absolute",
    top: Normalize(45),
    left: Normalize(10),
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: fontNormalize(34),
    fontWeight: "900",
    // fontFamily: 'Comfortaa-Bold',
    padding: Normalize(5),
    color: '#fff',
    fontWeight: "bold"
  },
  cleaningservicedetailtext: {
    marginTop: Normalize(40),
    position: "absolute",
    top: Normalize(85),
    left: Normalize(10),
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'left',
    fontSize: fontNormalize(15),
    // fontFamily: 'Comfortaa-Regular',
    padding: Normalize(5),
    color: '#fff',
    lineHeight: Normalize(25)
  }
});



export default withNamespaces()(HomeScreenLogIn);
