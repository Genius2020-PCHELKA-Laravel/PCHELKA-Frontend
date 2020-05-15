/*import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';

export default class Radio1 extends Component {
    state = {
        data: [
            {
                label: 'One-time (Book a cleaning for one-time only)',
              
                value:1,
                size: 32,
                color:'blue'
                ,
                label2:'gcchfd'
            },
            {
                label: 'Bi-weekly',
                value: "2",
                size: 32,
                color:'blue',
              
            },
           
           
            {
                label: 'Weekly  ',
                size: 32,
                value:3,
                color:'blue'
                
            },
        ],
    };

    // update state
    onPress = data => this.setState({ data });

    render() {
        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        return (
            <View style={styles.container}>
              
              
                <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    
        alignItems: 'center',
        justifyContent: 'center',
        
    },valueText: {
      fontSize: 300, 
      marginBottom: 50,
  },
});*/
import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

export default class MyComponent extends React.Component {
  state = {
    value: '1',
  };

  
  render() {
    return(
      <RadioButton.Group
        onValueChange={value =>this.setState({ value })
          
        }
        value={this.state.value}

    > 

        <View style ={{marginBottom: 30}}>
  <Text>{this.state.value}</Text>      
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
    
    )
  }
}