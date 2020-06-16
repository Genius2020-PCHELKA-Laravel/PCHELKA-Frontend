import React from 'react';
import { Text, StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import { withNamespaces } from 'react-i18next';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { navigate } from '../navigationRef';

const servicesdetails = ({ navigation, nav, redirect, title, imagesource, t }) => {


  return (<View style={styles.container}>
    <View flexDirection="column">
      <TouchableOpacity onPress={() => navigate(nav, { redirect: redirect })}>
        <Image style={styles.image} source={imagesource} />
      </TouchableOpacity>
      <View flexDirection="column" style={styles.text}>
        <FontBold mystyle={styles.servicetext} value={title} />
        <TouchableOpacity onPress={() => navigate(nav, { redirect: redirect })}>
          <FontRegular value={t('booknow') + "  "} mystyle={styles.ButtonStyle} />
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
    fontSize: 16,
    position: "absolute",
    bottom: 65,
    fontSize: 18,
    color: '#fff',
    textAlign: "center"
  },
  booktext: {
    fontSize: 16,
    textAlignVertical: "center",
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    height: 120,
    opacity: 0.6,
    backgroundColor: 'black',

  },
  container: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 0,
    borderColor: '#7a7a7a',
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 2,
    marginBottom: 10

  },
  ButtonStyle: {
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderColor: '#fff',
    fontSize: 16,
    fontWeight: "500",
    color: '#7a7a7a',
  },
});

export default withNamespaces()(servicesdetails);