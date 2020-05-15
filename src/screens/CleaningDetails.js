import React from 'react';
import { Text, StyleSheet, View, Button,TextInput,Icon, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'
import {Badge} from 'native-base';
import {Container,Footer, FooterTab, Card, CardItem,Body} from 'native-base';

const CleaningDetails= ({ navigation }) => {
    
  
  return (
  <View> 
    <Text style={styles.text}>CleaningDetails screen </Text>

    <Text style={styles.text}>How many hourse do you need your cleaner to stay? </Text>
    <View style={{flexDirection:'row'}}>  
       
   
      <Badge info style={{fontSize:20,marginStart:30}}>
      <Text style={{fontSize:20}}>2</Text> 
      </Badge>
      <Badge info style={{fontSize:20,marginStart:30}}>
      <Text  style={{fontSize:20}}>3</Text> 
      </Badge>
      <Badge info style={{fontSize:20,marginStart:30}}>
      <Text  style={{fontSize:20}}>4</Text> 
      </Badge>
      <Badge info style={{fontSize:20,marginStart:30}}>
      <Text  style={{fontSize:20}}>5</Text> 
      </Badge>
   
      <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>6</Text> 
       </Badge>
       <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>7</Text> 
       </Badge>
    </View>
    <Text style={styles.text}>How many cleaners do you need? </Text>
    <View style={{flexDirection:'row'}}>  
       
   
       <Badge info style={{fontSize:20,marginStart:30}}>
       <Text style={{fontSize:20}}>2</Text> 
       </Badge>
       <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>3</Text> 
       </Badge>
       <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>4</Text> 
       </Badge>
       <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>5</Text> 
       </Badge>
    
    
    
     </View>
    <Text style={styles.text}>Do you require cleaning material? </Text>
    <View style={{flexDirection:'row'}}><Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>No I have them</Text> 
       </Badge>
       <Badge info style={{fontSize:20,marginStart:30}}>
       <Text  style={{fontSize:20}}>yes,please</Text> 
       </Badge>
    </View>
    <Text style={styles.text}>Do you have any special cleaning instruction? </Text>
    <Card>
            
            <CardItem bordered>
              <Body>
               
                <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder="Example: window cleaning etc..."  
                  
                />  
              
              </Body>
            </CardItem>
           
          </Card>
          <Footer>
          <FooterTab>
          <Button title="Next" onPress={()=>{navigation.navigate('datetimescreen')}}/>
        
              <Text>Total $:</Text>
            
          </FooterTab>
        </Footer>
  
 
  </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25
  }
});

export default CleaningDetails;
