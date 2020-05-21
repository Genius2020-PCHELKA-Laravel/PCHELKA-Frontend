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
import { Context as AuthContext } from './context/AuthContext';
const HomeScreen = ({ navigation, t }) => {
  const { state, logout } = useContext(AuthContext);
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;
  //const [dropdownContents, setDropdownContents] = useState('');
  return (<>
    <ScrollView>
      <Slider style={{ height: imageHeight, width: imageWidth }} />
      <Spacer>
        <View style={styles.middlecontainer1}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeCleaningScreen')}>
            <Image resizeMethod='auto' style={{ borderRadius: 5, height: imageHeight, width: imageWidth - 20, marginLeft: 5, marginRight: 5 }} source={require('../../assets/homecleaning.jpg')} />
            <TouchableOpacity onPress={() => navigation.navigate('HomeCleaningScreen')}>
              <Text style={styles.booknowButtonStyle}>
                <FontBold value={t('booknow')}>
                </FontBold>{' '}
                <FontAwesome5 name="chevron-right" size={15} color="#161924" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.cleaningservicetext}>
              <FontBold value={t('cleaningservicetext')} />
            </Text>
            <Text style={styles.cleaningservicedetailtext}>
              <FontBold value={t('cleaningservicedetailtext')} />
            </Text>
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
          <Text style={styles.homescreentext}>
            <FontBold value={t('homescreentext')} />
          </Text>
        </View>
      </Spacer>
      <Spacer>
        <View style={styles.bottomcontainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} title={t('fulltimemade')} imagesource={require('../../assets/maid.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} title={t('laundary')} imagesource={require('../../assets/maid.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} title={t('disinfectionservices')} imagesource={require('../../assets/disinfection.jpg')} />
            <Servicesdetails contentContainerStyle={{ alignItems: "center" }} title={t('sofacleaning')} imagesource={require('../../assets/sofa.jpg')} />
          </ScrollView>
        </View>
      </Spacer>
    </ScrollView>
  </>)
};

const styles = StyleSheet.create({
  everthingtext: {
    fontSize: 10,
    color: 'gray',
    // fontFamily: 'Comfortaa-Bold'
  },
  homescreentext: {
    fontSize: 30,
    fontWeight: "500",
    // fontFamily: 'Comfortaa-Regular'
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
    backgroundColor: '#DAA520',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DAA520',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "500",
    // fontFamily: 'Comfortaa-Bold',
    padding: 5
  },
  cleaningservicetext: {
    margin: 5,
    position: "absolute",
    top: 15,
    left: 10,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: "900",
    // fontFamily: 'Comfortaa-Bold',
    padding: 5,
  },
  cleaningservicedetailtext: {
    margin: 5,
    position: "absolute",
    top: 60,
    left: 10,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'left',
    fontSize: 21,
    // fontFamily: 'Comfortaa-Regular',
    padding: 5,
    color: 'yellow'
  }

});


export default withNamespaces()(HomeScreen);
