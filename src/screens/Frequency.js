import React ,{useState}from 'react';
import {  StyleSheet,  View, TouchableOpacity } from 'react-native';
import {Container,Footer, FooterTab,Button,} from 'native-base';
import { CheckBox,Icon } from 'react-native-elements'
import { RadioButton, Text } from 'react-native-paper';

const Frequency = ({ navigation }) => {
 const [state,setState]=useState(0);
  return (
  <View style={{flex:1}}> 
    
    <RadioButton.Group
        onValueChange={setState}
          
        
        value={state}

    > 

        <View style ={{marginBottom: 30}}>
  <Text>{state}</Text>      
        <View style={{flexDirection:'row'}}>
        <RadioButton value="1" />
          <Text style={{fontSize:23}}>One-time</Text>

       
          </View>
          <Text style={{marginLeft:35}}>Book acleaning for one time only</Text>
        </View>
        <View>
        <View style={{flexDirection:'row'}}>
        <RadioButton value="2" />
          <Text  style={{fontSize:23}}>Bi-weekly</Text>
          
          </View>
          <Text style={{marginLeft:35}}>Book a recurring cleaning with the same cleaner every two-weeks</Text>
        </View>
        <View>
        <View style={{flexDirection:'row'}}>
        <RadioButton value="3" />
          <Text  style={{fontSize:23}}>Weekly</Text>
          
          </View>
          <Text style={{marginLeft:35}}>Book a recurring with the same cleaner every week</Text>
        </View>
      </RadioButton.Group>
    
  
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
        
              <Text>Total $:</Text>
            
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
