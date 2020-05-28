// import React, { useState } from 'react';
// import { View, Button, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { withNamespaces } from 'react-i18next';
// import Moment from 'moment';
// import FontBold from '../components/FontBold';
// import FontRegular from '../components/FontRegular';
// import FontLight from '../components/FontLight';
// import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

// const CDate = ({ t }) => {
//     const [date, setDate] = useState(new Date());
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);

//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date;
//         setShow(Platform.OS === 'ios');
//         setDate(currentDate);
//     };

//     const showMode = currentMode => {
//         setShow(true);
//         setMode(currentMode);
//     };

//     const showDatepicker = () => {
//         showMode('date');
//     };

//     const showTimepicker = () => {
//         showMode('time');
//     };

//     return (
//         <View>
//             <View style={styles.SectionStyle}>
//                 <TouchableOpacity onPress={showDatepicker} >
//                     <FontBold mystyle={styles.inputStyle} value={Moment(date).format('YYYY-MM-DD')} />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={showDatepicker} >
//                     <Fontisto name="date" size={24} color="#FF9800" style={{ left: 9, top: 9 }} />
//                 </TouchableOpacity>
//             </View>
//             {/* <View>
//                 <Button onPress={showTimepicker} title="Show time picker!" />
//             </View> */}
//             {show && (
//                 <DateTimePicker
//                     testID="dateTimePicker"
//                     timeZoneOffsetInMinutes={0}
//                     value={date}
//                     mode={mode}
//                     is24Hour={true}
//                     display="default"
//                     onChange={onChange}
//                     androidMode={"default"}
//                     datePickerBg={{ backgroundColor: 'red' }}

//                 />
//             )}
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     SectionStyle: {
//         flexDirection: 'row',
//         height: 45,
//         marginTop: 20,
//         marginLeft: 35,
//         marginRight: 35,
//         margin: 10,
//     },
//     inputStyle: {
//         flex: 1,
//         color: 'black',
//         paddingLeft: 15,
//         paddingRight: 15,
//         borderWidth: 1,
//         borderRadius: 30,
//         borderColor: '#ff9800',
//         fontSize: 20,
//         padding: 10,
//         height: 50
//     },
// });
// export default withNamespaces()(CDate);