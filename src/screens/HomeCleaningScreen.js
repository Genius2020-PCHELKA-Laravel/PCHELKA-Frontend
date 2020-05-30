import React, { useContext, useEffect, useState } from 'react';
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
import { Context as UserContext } from './context/UserContext';
import { Context as HCContext } from './context/HCContext';
import { withNamespaces } from 'react-i18next';
import Toast from 'react-native-simple-toast';
import { navigate } from '../navigationRef';

const HomeCleaningScreen = ({ navigation, t }) => {
  // static navigationOptions = {
  //   headerShown: false
  // };
  const { state: hcstate, HCBooking } = useContext(HCContext);
  const { state } = useContext(UserContext);
  // const [hourPrice, setHourPrice] = useState(0);
  // const [hourMaterialPrice, setHourMaterialPrice] = useState(0);

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    }
  };
  useEffect(() => {
    console.log("HomeCleaningScreen::UseEffect::gethourprice");
    console.log("HomeCleaningScreen::UseEffect::State hour price:: " + hcstate.HC.hourPrice)

    console.log("HomeCleaningScreen::UseEffect::gethourmaterialprice");
    console.log("HomeCleaningScreen::UseEffect::State hour material price:: " + hcstate.HC.materialPrice)
  }, []);

  const onNextStep = () => {
    console.log('called next step');
  };

  const onFrequencyStepComplete = () => {
    // alert('Frequwncy step completed!');
  };
  const onAddressStepComplete = () => {
    console.log(state.selected_address_name);
    if (typeof state.selected_address == 'undefined') {
      Toast.show('Select address please', Toast.LONG);
      return;
    }
  };
  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = () => {
    var frequency = -1;
    if (hcstate.frequency == 1) frequency = 'One-time';
    if (hcstate.frequency == 2) frequency = 'Bi-weekly';
    if (hcstate.frequency == 3) frequency = 'Weekly';
    var hours = -1;
    if (hcstate.hours == 2) hours = 4;
    if (hcstate.hours == 3) hours = 5;
    if (hcstate.hours == 4) hours = 6;
    if (hcstate.hours == 5) hours = 7;
    if (hcstate.hours == 6) hours = 8;
    if (hcstate.hours == 7) hours = 9;
    var cleaners = -1;
    if (hcstate.cleaners == 1) cleaners = 10;
    if (hcstate.cleaners == 2) cleaners = 11;
    if (hcstate.cleaners == 3) cleaners = 12;
    if (hcstate.cleaners == 4) cleaners = 13;
    var materials = -1;
    if (hcstate.materials == 0) materials = 14;
    if (hcstate.materials == 1) materials = 15;
    var paymentWays = -1;
    if (hcstate.method == 0) paymentWays = 0;
    if (hcstate.method == 1) paymentWays = 2;
    HCBooking({
      serviceType: "HomeCleaning",
      duoDate: hcstate.full_date,
      duoTime: hcstate.start,
      subTotal: hcstate.subtotal,
      discount: hcstate.discount,
      totalAmount: hcstate.total,
      locationId: state.selected_address,
      providerId: "1",
      scheduleId: "1",
      paymentWays: paymentWays,
      frequency: frequency,
      answers: [
        {
          questionId: 1,
          answerId: hcstate.frequency,
          answerValue: null
        },
        {
          questionId: 2,
          answerId: hours,
          answerValue: null
        },
        {
          questionId: 3,
          answerId: cleaners,
          answerValue: null
        },
        {
          questionId: 4,
          answerId: materials,
          answerValue: null
        },
        {
          questionId: 5,
          answerId: null,
          answerValue: hcstate.desc
        }
      ]
    }).then(() => {
      Toast.show('Booked', Toast.LONG);
      navigate('HomeStackNavigator')
    }).catch(() => {
      Toast.show('Error:: NotBooked', Toast.LONG);
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
            label={t('frequency')}
            onNext={onFrequencyStepComplete}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}
          >
            <Frequency />
          </ProgressStep>
          <ProgressStep
            label={t('cleaning')}
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}>
            <HomeCleaningDetails />
          </ProgressStep>
          <ProgressStep
            label={t('date')}
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}>
            <DateandTimeDetails />
          </ProgressStep>
          <ProgressStep
            label={t('address')}
            onPrevious={onPrevStep}
            onNext={onAddressStepComplete}
            // onSubmit={onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}>
            <AddressDetails />
          </ProgressStep>
          <ProgressStep
            label={t('payment')}
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.ButtonTextStyle}
            nextBtnStyle={styles.nextButtonStyle}
            previousBtnStyle={styles.previousButtonStyle}
            previousBtnTextStyle={styles.ButtonTextStyle}
            nextBtnText={t('next')}
            previousBtnText={t('previous')}
            finishBtnText={t('submit')}>
            <Payment />
          </ProgressStep>
        </ProgressSteps>
      </View>

      {/* <Text style={styles.modalText}>Modal{'  '}<FontAwesome5 name="chevron-up" size={15} color="#161924" /></Text> */}
      <ModalDetails style={styles.modalText} total={hcstate.total}></ModalDetails>

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
    left: 0,
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
    color: '#fff'
  },
});
export default withNamespaces()(HomeCleaningScreen);