import React from 'react';
import { Text, StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import { withNamespaces } from 'react-i18next';
import FontBold from '../components/FontBold';
import FontRegular from '../components/FontRegular';
import FontLight from '../components/FontLight';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const servicesdetails = ({ navigation, title, imagesource, t }) => {


  return (<View style={styles.container}>
    <View flexDirection="column">
      <Image flexDirection="row" style={styles.image} source={imagesource} />
      <View flexDirection="column" style={styles.text}>
        <Text flexDirection="row" style={styles.servicetext}>
          <FontBold value={title} />
        </Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text flexDirection="row" style={styles.ButtonStyle}>
            <FontRegular value={t('booknow')} >
            </FontRegular>{' '}
            <FontAwesome5 name="chevron-right" size={15} color="white" />
          </Text>
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
    bottom: 75,
    fontSize: 18,
    color: '#fff',
    left: 20,
  },
  booktext: {
    fontSize: 16,
  },
  image: {
    width: '98%',
    borderRadius: 7,
    height: 120,
    opacity: 0.8,
    backgroundColor: 'black',

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin: 2,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#f5c500',
    borderRadius: 7,
    padding: 14
  },
  ButtonStyle: {
    marginTop: 10,
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#ff9800',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ff9800',
    fontSize: 16,
    fontWeight: "500",
    color: 'white',
    paddingHorizontal: 25
  },
});

export default withNamespaces()(servicesdetails);