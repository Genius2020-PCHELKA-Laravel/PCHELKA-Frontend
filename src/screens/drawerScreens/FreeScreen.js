import React, { useContext } from 'react';
import { Text, StyleSheet, View, Button, SafeAreaView, AsyncStorage, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Context as Authcontext2 } from '../context/AuthContext';
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from '../../components/Spacer';
import FontBold from '../../components/FontBold';
import FontLight from '../../components/FontLight';
import FonrRegular from '../../components/FontRegular';
import { withNamespaces } from 'react-i18next';
import { navigate } from "../../navigationRef";
const FreeScreen = ({ navigation, t }) => {
  const { logout } = useContext(Authcontext2);
  getData = async () => {
    try {
      const value = await AsyncStorage.removeItem('token')


    } catch (e) {
      // error reading value
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>

        <Text>Free</Text>


      </View>
      <TouchableOpacity style={{ backgroundColor: "#fff" }} onPress={() => { navigate('HomeNavigator') }}>
        <Spacer>
          <FontBold value={t('homepage')} mystyle={{ textAlign: "center", fontSize: 12, color: 'blue' }}></FontBold>
        </Spacer>
      </TouchableOpacity>

    </View>);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500"
  }
});

export default withNamespaces()(FreeScreen);
