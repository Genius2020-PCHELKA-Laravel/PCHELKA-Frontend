import React ,{useEffect}from 'react';
import {  StyleSheet,  View, TouchableOpacity } from 'react-native';
import {Container,Footer, FooterTab,Button,Text,} from 'native-base';
import { CheckBox,Icon } from 'react-native-elements'
import Radio1 from './Radio1';

const Frequency = ({ navigation }) => {
 
  return (
  <View style={{flex:1}}> 
    
    <Radio1  />
  
  <Footer>
          <FooterTab>
          <Icon
             raised
            name='heartbeat'
            type='font-awesome'
            color='#f50'
  style={{marginBottom:40
  }}
  onPress={() => {navigation.navigate('cleanindetailsscreen')}} />
        
              <Text>Footer</Text>
            
          </FooterTab>
        </Footer>
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Frequency;
