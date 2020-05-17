import React ,{useContext,useEffect,useState}from 'react';
import { Text,StyleSheet, View, Button,ScrollView, Image,TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';
import Servicesdetails from '../components/Servicesdetails';
import {Context as Authcon} from './context/Authcontext';
import requestApi from '../api/axiosapi';
const HomeScreen = ({ navigation }) => {
const [services,setservices]=useState([])
useEffect(async()=>{
  
    const respons=await  requestApi.get('/service');
  setservices(respons.data);
  
   
    console.log(respons.data);
});
  return (<View> 
   

   <TouchableOpacity onPress={()=> navigation.navigate('loginph')}>
      <AntDesign name="login" size={24} color="black"/>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=> navigation.navigate('locationscreen')}>
     <AntDesign name="login" size={24} color="black"/>
  </TouchableOpacity>
    <View  style={styles.container}>
      
   
    <TouchableOpacity onPress={()=> navigation.navigate('frequency')}>
    <Image  style={styles.image} source={require('../../assets/homecleaning.jpg')}/>
      <Text style={styles.text}>Book Now</Text>
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
    fontSize: 30
  },
  container: {
    paddingBottom:8,
    paddingTop:8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  
  }
  
});

export default HomeScreen;
