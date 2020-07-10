import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import { withNamespaces } from 'react-i18next';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { navigate } from '../navigationRef';
import { getLang, storeLang } from '../api/userLanguage';
import { fontNormalize, Normalize } from './actuatedNormalize';

const servicesdetails = ({ navigation, nav, redirect, biosafe, trending, comming, title, imagesource, t }) => {
  const [lang, setLang] = useState(false);
  getLang().then((response) => {
    setLang(response);
  }).catch(async (err) => {
    setLang('en');
  });
  return (<View style={styles.container}>
    <View flexDirection="column">
      <TouchableOpacity onPress={() => navigate(nav, { redirect: redirect })}>
        {
          comming == "yes" ?
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <FontRegular value={t('commingsoon')} mystyle={styles.comming} />
            </View>
            : null

        }
        {
          biosafe == "yes" ?
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <FontRegular value={t('biosafe')} mystyle={styles.biosafe} />
            </View>
            : null
        }
        {
          trending == "yes" ?
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <FontRegular value={t('trending')} mystyle={styles.trending} />
            </View>
            : null
        }
        <Image style={styles.image} source={imagesource} />
      </TouchableOpacity>
      <View flexDirection="column" style={styles.text}>

        <FontBold mystyle={styles.servicetext} value={title} />
        <TouchableOpacity onPress={() => navigate(nav, { redirect: redirect })}>
          <FontRegular value={t('booknow')} mystyle={lang == 'ru' ? styles.ruButtonStyle : styles.enButtonStyle} />
        </TouchableOpacity>
      </View>
    </View>
  </View >);
};

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
  },
  servicetext: {
    fontSize: fontNormalize(14),
    position: "absolute",
    bottom: Normalize(60),
    color: '#fff',
    textAlign: "center"
  },
  booktext: {
    fontSize: fontNormalize(16),
    textAlignVertical: "center",
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    height: Normalize(120),
    opacity: 0.6,
    backgroundColor: 'black',

  },
  container: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 0,
    borderColor: '#7a7a7a',
    shadowOffset: { width: Normalize(15), height: Normalize(15) },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 2,
    marginBottom: Normalize(20)

  },
  ruButtonStyle: {
    paddingHorizontal: Normalize(30),
    paddingVertical: Normalize(10),
    marginLeft: Normalize(30),
    marginRight: Normalize(30),
    borderWidth: 1,
    borderColor: '#fff',
    fontSize: fontNormalize(16),
    fontWeight: "500",
    color: '#7a7a7a',
  },
  enButtonStyle: {
    paddingHorizontal: Normalize(10),
    paddingVertical: Normalize(10),
    marginLeft: Normalize(30),
    marginRight: Normalize(30),
    borderWidth: 1,
    borderColor: '#fff',
    fontSize: fontNormalize(16),
    fontWeight: "500",
    color: '#7a7a7a',
  },
  comming: {
    position: "absolute",
    top: Normalize(30),
    backgroundColor: '#f5c500',
    borderRadius: 4,
    color: '#fff',
    textAlign: 'center',
    fontSize: fontNormalize(12),
    fontWeight: 'bold',
    // fontFamily: 'Comfortaa-Bold',
    paddingHorizontal: Normalize(5),
    justifyContent: "center",
    zIndex: 16
  },
  biosafe: {
    position: "absolute",
    top: Normalize(30),
    backgroundColor: 'purple',
    borderRadius: 4,
    color: '#fff',
    textAlign: 'center',
    fontSize: fontNormalize(12),
    fontWeight: 'bold',
    // fontFamily: 'Comfortaa-Bold',
    paddingHorizontal: Normalize(5),
    justifyContent: "center",
    zIndex: 16
  },
  trending: {
    position: "absolute",
    top: Normalize(30),
    backgroundColor: 'blue',
    borderRadius: 4,
    color: '#fff',
    textAlign: 'center',
    fontSize: fontNormalize(12),
    fontWeight: 'bold',
    // fontFamily: 'Comfortaa-Bold',
    paddingHorizontal: Normalize(5),
    justifyContent: "center",
    zIndex: 16
  },
});

export default withNamespaces()(servicesdetails);