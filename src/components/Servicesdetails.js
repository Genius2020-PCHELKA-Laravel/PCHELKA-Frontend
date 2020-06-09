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
            <FontRegular value={t('booknow') + "  "} mystyle={styles.booktext} />
            {/* <FontAwesome5 name="chevron-right" size={15} color="#7a7a7a" /> */}
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
    textAlign: "center"
  },
  booktext: {
    fontSize: 16,
    textAlignVertical: "center",
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 7,
    borderTopLeftRadius: 7,
    height: 120,
    opacity: 0.6,
    backgroundColor: 'black',

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#7a7a7a'
  },
  ButtonStyle: {
    marginTop: 10,
    padding: 5,
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