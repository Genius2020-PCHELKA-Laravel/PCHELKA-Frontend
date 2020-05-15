import React,{useState,useEffect} from 'react';
import {Text,
    View,
    StyleSheet,
    Button,
    SearchBar,
Platform
} from 'react-native';

import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import * as Location from 'expo-location';
let latitude=0;
let longitude=0;

const location = () =>{

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);

/*useEffect(() => {
  (async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
});
let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }*/
    return (<View>

      
       
<MapView 
provider={PROVIDER_GOOGLE}
style={styles.mape}
 initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}

>
    <Marker 
    coordinate={{latitude:37.78825,longitude:-122.44}}
    title={"sanfransisc"} draggable
    isPreselected={true}
    onDragEnd   ={e => {latitude=e.nativeEvent.coordinate.latitude;
    longitude=e.nativeEvent.coordinate.longitude;
}
   
 } ></Marker>
  
</MapView>
<Button title={"تأكيد"}  onPress={e => console.log(e.nativeEvent)}/>
{errorMsg ?<Text>Please enable location services</Text>: null }


    </View>
    );
   
}

const styles=StyleSheet.create({
    mape: {
        height :500
,flex:1

    }
});

export default location;
