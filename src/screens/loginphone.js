import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button  } from 'react-native-elements';



const  loginphone =({navigation}) => {


 

 const [numbern,setNumber]=useState(''); 
 const [RandomNumber,setRandomNumber]=useState(0); 

  return (
    
     <View style={styles.container}>
       <Text style={styles.Texts}>  please verify your number </Text>
       <Text style={styles.Texts}>   </Text>
       <Text style={styles.Texts}>   </Text>
       <Text style={styles.Textss}>  your mobile number </Text>
       <Input
           keyboardType='phone-pad'
           placeholder='+963 934 996 224'
           leftIcon={ <Icon name='phone' size={24} color='black' />}
           value={numbern}
           onChangeText={setNumber}
           />
            { numbern.length!=10 ? <Text> phone should be 10</Text> : null }
<Button
  icon={
    <Icon
      name="arrow-right"
      size={15}
      color="white"
    />
  }
  iconRight
  title="verify"
  onPress={() => {navigation.navigate('ver',{data:numbern}) ,
  RandomNumb = Math.floor(Math.random() * 10000) + 1 ;
console.log(RandomNumb);}}
  
/>

<Text style={styles.Texts}> {numbern}  </Text>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Texts:{fontSize:25 , justifyContent: 'center' },
  Textss:{fontSize:12 , paddingRight:280}
});

export default loginphone;