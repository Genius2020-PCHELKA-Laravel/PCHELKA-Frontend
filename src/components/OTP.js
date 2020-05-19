// import React, { Component } from 'react';
// import { Button, View } from 'react-native';
// import OtpInputs from 'react-native-otp-inputs';

// export default class App extends Component {
//     otpRef = React.createRef();

//     focusOTP = () => {
//         this.otpRef.current.focus();
//     };

//     resetOTP = () => {
//         this.otpRef.current.reset();
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Button title="Reset" onPress={this.resetOTP} />
//                 <Button title="Focus" onPress={this.focusOTP} />
//                 <OtpInputs
//                     ref={this.otpRef}
//                     handleChange={(code) => console.log(code)}
//                     numberOfInputs={6}
//                     inputContainerStyles={styles.input}
//                 />
//             </View>
//         );
//     }
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });