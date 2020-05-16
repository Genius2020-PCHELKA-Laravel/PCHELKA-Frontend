import React from 'react';
import { Text,StyleSheet, View, Button,ScrollView, SafeAreaView,Image,TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import {AntDesign,FontAwesome5} from '@expo/vector-icons';
import Servicesdetails from '../components/Servicesdetails';
import i18n  from '../locales/i18n';
import { withNamespaces } from 'react-i18next';
const HomeScreenLogIn = ({ navigation,t }) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }
  return (<View> 
   
  
    
    
    <View  style={styles.container2 }>
        <View style={{flexDirection:'row'}}>
   
         
      
        <TouchableOpacity
        style={{alignItems:"center",margin:16,paddingTop:1}} 
         onPress={()=> navigation.navigate('locationscreen')}>
         <AntDesign name="login" size={24} color="black"/>
          </TouchableOpacity>


          <TouchableOpacity style={{alignItems:"flex-end",margin:16,paddingTop:1,paddingLeft:270}} 
           onPress={() => changeLanguage('en')}>
            <Text>EN</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{alignItems:"flex-end",margin:16,paddingTop:1,paddingLeft:270}} 
           onPress={() => changeLanguage('ru')}>
            <Text>RU</Text>
          </TouchableOpacity>          

          <TouchableOpacity style={{alignItems:"flex-end",margin:16,paddingTop:1,paddingLeft:270}} 
           onPress={navigation.openDrawer }>
            <FontAwesome5 name="bars" size={24} color="#161924" />
          </TouchableOpacity>
         
          </View>
    <TouchableOpacity onPress={()=> navigation.navigate('frequency')}>
    <Image  style={styles.image} source={require('../../assets/homecleaning.jpg')}/>
      <Text style={styles.text}>{t('Welcome')}</Text>
      </TouchableOpacity>
    
    </View >
    <Text style={styles.text}>What other services can we help you with?</Text>
    <ScrollView horizontal >
    <Servicesdetails title="Full Time Made" imagesource={require('../../assets/maid.jpg')}/>
    <Servicesdetails title="Laundary" imagesource={require('../../assets/maid.jpg')}/>
    <Servicesdetails title="Disinfection services" imagesource={require('../../assets/disinfection.jpg')}/>
    <Servicesdetails title="sofa cleaning" imagesource={require('../../assets/sofa.jpg')}/>
    </ScrollView>
    </View>);
};



const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color :"#161924",
    fontWeight:"500"
  },
  container2: {
    paddingBottom:8,
    paddingTop:8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  }
  
});


export default withNamespaces()(HomeScreenLogIn);
