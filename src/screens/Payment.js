import React ,{useState}from 'react';
import { Text, StyleSheet, View,  TouchableOpacity ,TextInput} from 'react-native';
import { RadioButton} from 'react-native-paper';
import {Container,Footer, FooterTab,Button, Card, CardItem,Body} from 'native-base';
import { CheckBox,Icon } from 'react-native-elements'
const Payment= ({ navigation }) => {
  const [state,setState]=useState('1');
  const [tex,settext]=useState('');
  return (
  <View> 
    
    
 
    <RadioButton.Group
        onValueChange={setState}
          
        value={state}
        

    > 

        <View style ={{marginBottom: 30}}>
      
        <View style={{flexDirection:'row'}}>
        <RadioButton value="1" />
  <Text style={{fontSize:23}}>Pay by credit/debit card </Text>

  
          </View>
          <Text style={{marginLeft:35}}>insuurance when you pay online AED 1000</Text>
        </View>
        <Card>
            
            <CardItem bordered>
              <Body>
                <Text>
                  CARD NUMBER
                </Text>
                <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder="0000 0000 0000 0000"  
                    onChangeText={setState}  
                />  
                <Text>
                  EXPIRY DATE
                </Text>
                <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder="MM/YY"  
                    onChangeText={setState}  

                />  
                <Text>
                  CVV
                </Text>
                <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder="123"  
                    onChangeText={setState}  
                />  
              </Body>
            </CardItem>
           
          </Card>
        <View>
        <View style={{flexDirection:'row'}}>
        <RadioButton value="2" />
          <Text  style={{fontSize:23}}>Pay with cash (+5 AED)</Text>
          
          </View>
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
  onPress={() => {navigation.navigate('')}} />
        
              <Text>Total</Text>
            
          </FooterTab>
        </Footer>
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Payment;
