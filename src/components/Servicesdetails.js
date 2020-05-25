import React from 'react';
import { Text, StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import { withNamespaces } from 'react-i18next';
import FontBold from '../components/FontBold';

const servicesdetails = ({ navigation, title, imagesource, t }) => {


  return (<View style={styles.container}>
    <View flexDirection="column">
      <Image flexDirection="row" style={styles.image} source={imagesource} />
      <View flexDirection="column" style={styles.text}>
        <Text flexDirection="row" style={styles.servicetext}>
          <FontBold value={title} />
        </Text>
        <Text flexDirection="row" style={styles.ButtonStyle}>
          <FontBold value={t('booknow')} />
        </Text>
      </View>
    </View>
  </View>);
};

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
  },
  servicetext: {
    fontSize: 14,
  },
  booktext: {
    fontSize: 16,
  },
  image: {
    width: 200,
    borderRadius: 4,
    height: 120
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin: 2,
    borderColor: '#ffd699',
    borderWidth: 1,
    backgroundColor: '#ffd699'
  },
  ButtonStyle: {
    marginTop: 10,
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#FF9800',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF9800',
    fontSize: 16,
    fontWeight: "500",
    color: 'white',
    color: 'white'
  },
});

export default withNamespaces()(servicesdetails);