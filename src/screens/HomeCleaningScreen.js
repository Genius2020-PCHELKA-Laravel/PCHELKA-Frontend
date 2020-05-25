import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Frequency from '../components/HomeCleaningSteps/Frequency';
import HomeCleaningDetails from '../components/HomeCleaningSteps/HomeCleaningDetails';
import DateandTimeDetails from '../components/HomeCleaningSteps/DateandTimeDetails';
import AddressDetails from '../components/HomeCleaningSteps/AddressDetails';
import Payment from '../components/HomeCleaningSteps/Payment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import ModalDetails from '../components/ModalDetails';
import { Context as HCContext } from './context/HCContext';

const HomeCleaningScreen = ({ navigation, t }) => {
  // static navigationOptions = {
  //   headerShown: false
  // };
  const { state, HCBooking } = useContext(HCContext);

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };

  onNextStep = () => {
    console.log('called next step');
  };

  onFrequencyStepComplete = () => {
    // alert('Frequwncy step completed!');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    HCBooking({
      serviceType: "HomeCleaning",
      duoDate: state.full_date,
      duoTime: state.start,
      subTotal: state.subtotal,
      discount: state.discount,
      totalAmount: state.total,
      locationId: "1",
      providerId: "1",
      scheduleId: "1",
      paymentWays: state.method,
      frequency: state.frequency,
      answers: [
        {
          questionId: 4,
          answerId: state.materials,
          answerValue: null
        },
        {
          questionId: 3,
          answerId: null,
          answerValue: state.desc
        }
      ]
    });
  };
  // FFFDD0...Cream EEDC82 ffe5b4 fedc56 ceb180 f8e473 ffbf00 fce205 ffc30b
  return (
    <>
      <View style={{ flex: 1, marginTop: 10, margin: 15 }}>
        <ProgressSteps
          activeStepIconBorderColor='#f1c40f'
          activeLabelColor='#f1c40f'
          completedProgressBarColor='#f1c40f'
          completedStepIconColor='#f1c40f'
          labelFontFamily='' backgroundColor='#ffffff'>
          <ProgressStep
            label="Frequency"
            onNext={onFrequencyStepComplete}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
          >
            <Frequency />
          </ProgressStep>
          <ProgressStep
            label="Cleaning"
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}>
            <HomeCleaningDetails />
          </ProgressStep>
          <ProgressStep
            label="Date"
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}>
            <DateandTimeDetails />
          </ProgressStep>
          <ProgressStep
            label="Address"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}>
            <AddressDetails />
          </ProgressStep>
          <ProgressStep
            label="Payment"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}>
            <Payment />
          </ProgressStep>
        </ProgressSteps>
      </View>

      {/* <Text style={styles.modalText}>Modal{'  '}<FontAwesome5 name="chevron-up" size={15} color="#161924" /></Text> */}
      <ModalDetails style={styles.modalText} total={state.total}></ModalDetails>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  nextButtonStyle: {
    top: 20,
    right: -65,
    backgroundColor: '#f1c40f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DAA520',
    // fontFamily: 'Comfortaa-Bold',
    paddingHorizontal: 25,
  },
  previousButtonStyle: {
    top: 20,
    right: -65,
    backgroundColor: '#f1c40f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DAA520',
    // fontFamily: 'Comfortaa-Bold',
    paddingHorizontal: 20,
  },
  modalButtonStyle: {
    position: 'absolute',
    left: 10,
    bottom: 35,
    paddingHorizontal: 20,
    backgroundColor: '#f1c40f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DAA520',
    // fontFamily: 'Comfortaa-Bold',

  },
  modalText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ButtonTextStyle: {
    color: '#000'
  },
});
export default HomeCleaningScreen;