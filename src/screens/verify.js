import React, { Component, useEffect, useState, useContext } from 'react';
import { fingerprintIcon, deleteIcon, closeIcon } from '../../static';
import { StyleSheet, Text, View, AsyncStorage, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import Timer from './Timer';


import { Context as Authcontext1 } from '../screens/context/AuthContext';
//import AsyncStorage from '@react-native-community/async-storage';
const arrayOfNumbers = [
  { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }, { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }, { key: 10 }, { key: 0 }, { key: 12 }
];

const empties = [{ key: 1, value: ' ' }, { key: 2, value: ' ' }, { key: 3, value: ' ' }, { key: 4, value: ' ' }];

let counter = 0;



const verify = props => {
  const [token, settoken] = useState('');
  getData = async () => {
    try {
      settoken(await AsyncStorage.getItem('token'));

      console.log(token);

    } catch (e) {
      console.log("error in token");
    }
  }
  useEffect(() => {
    this.getData();
  });

  const [code, setcode] = useState('');
  const [digitDisabled, setdigitDisabled] = useState(false);
  const [clearDisabled, setclearDisabled] = useState(false);
  const [vernumber, setvernumber] = useState('');
  const [allowClear, setallowClear] = useState(false);



  const { state, verifysms } = useContext(Authcontext1);




  const data = fname = props.navigation.getParam('data');

  const otp = props.navigation.getParam('ver');
  /*
   onsubmit=async()=>{
     try{
     // await AsyncStorage.removeItem('token') ;

    await AsyncStorage.setItem('token','123')
  }
    catch(err){console.log(err);}
   
 */


  onEnterDigit = (num, index) => {


    if (counter + 1 <= 4) {
      counter++;
      empties[counter - 1].value = num;
      setclearDisabled(false);


    }
    if (counter === 4) {
      setvernumber(this.joinElements());
      console.log(vernumber);

      setdigitDisabled(true);

    }
  };

  joinElements = () => {

    let pincode = '';
    empties.forEach(item => {
      pincode += `${item.value}`;
    });
    var s = "";
    var i = 4;
    while (i > 0) {
      s += pincode.substring(i - 1, i);
      i--;
    }
    return s;
  };

  onRemoveDigit = () => {
    if (counter - 1 >= 0) {
      --counter;
      empties[counter].value = ' ';
      setdigitDisabled(false);

    } else {
      setallowClear(true);

    }
  };
  renderItemCell = ({ item, index }) => {
    const { withTouchId = false } = props;
    if (index === 9) {
      if (withTouchId) {
        return (
          <TouchableOpacity style={[styles.round, styles.centerAlignment]} onPress={() => props.onPressTouchId()} >
            <Image source={fingerprintIcon.src} style={styles.icon} />
          </TouchableOpacity>
        );
      } else {
        return <View style={[styles.round]} />;
      }

    } else if (index === 11) {
      return (
        <TouchableOpacity
          style={[styles.round, styles.centerAlignment]}
          onPress={this.onRemoveDigit}
          disabled={clearDisabled}
        >
          <Image source={deleteIcon.src} style={styles.deleteIcon} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.round, styles.centerAlignment]}
          onPress={() => this.onEnterDigit(item.key)}
          disabled={digitDisabled}
        >
          <Text style={styles.digit}>{item.key}</Text>
        </TouchableOpacity>
      );
    }
  };

  const { spaceColor, closeButtonColor } = props;


  useEffect(() => {



  })

  return (
    <View style={styles.container}>
      <Text style={styles.Texts}>  verify phone number  </Text>
      <Text style={styles.Texts}> {JSON.stringify(data)}  </Text>
      <Text style={styles.Texts}> {JSON.stringify(otp)}  </Text>
      <Text style={styles.Texts}> </Text>
      <Text style={styles.Texts}>   </Text>
      <Timer />
      <View style={styles.container}>
        {state.errorMessage ? <Text style={styles.Texts}> {state.errorMessage}  </Text> : null}
        <View style={styles.enterView}>
          {empties.map(item => (
            <View key={item.key} style={styles.digitView}>
              <Text style={styles.digit}>{item.value}</Text>
              <View style={[styles.redSpace, { backgroundColor: spaceColor || '#FF0000' }]} />
            </View>
          ))}
        </View>
        <View style={[styles.textView, styles.centerAlignment]}>
          <Text style={styles.instruction}>
            {props.descriptionText || 'Please enter pincode for entry'}
          </Text>

        </View>
        <View style={styles.flatcontainer}>
          <FlatList
            style={styles.flatlist}
            data={arrayOfNumbers}
            renderItem={this.renderItemCell}
            numColumns={3}
          />
        </View>
      </View>



      <Button
        icon={
          <Icon
            name="arrow-right"
            size={15}
            color="white"
          />
        }
        iconRight
        title="confirm"
        onPress={() => {
          enteredotp = vernumber.toString();
          mobile = data;


          console.log(enteredotp);
          verifysms(enteredotp, otp, mobile);
          if (token != '')
            props.navigation.navigate('Home1');
        }
        }



      />
    </View>);
};








const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rec: {
    borderWidth: 10,
    borderColor: '#d6d6d6',
    padding: 8,
    margin: 10,
    width: 20

  },

  centerAlignment: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterView: {
    alignSelf: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  flatcontainer: {
    flex: 6
  },
  flatlist: {
    alignSelf: 'center'
  },
  icon: {
    height: 24,
    width: 24
  },
  round: {
    width: 60,
    height: 60,
    backgroundColor: '#E8E8E8',
    borderRadius: 30,
    margin: 10
  },
  instruction: {
    marginHorizontal: 30,
    textAlign: 'center',
    color: 'gray',
    fontSize: 14
  },
  close: {
    marginTop: 30,
    marginLeft: 15
  },
  digit: {
    fontSize: 24
  },
  digitView: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  redSpace: {
    height: 2,
    width: 40,
    marginHorizontal: 5
  },
  textView: {
    flex: 0.5,
    marginBottom: 10
  },
  deleteIcon: {
    height: 20,
    width: 20
  }

});
export default verify;
