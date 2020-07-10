// import React, { PureComponent } from 'react';
// import { View, Text, Dimensions, StyleSheet } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// import FontBold from '../components/FontBold';
// import i18n from '../locales/i18n';
// const { width } = Dimensions.get('window');
// function MiniOfflineSign() {
//     return (
//         <View style={styles.offlineContainer}>
//             <FontBold value={i18n.t('noconnection')} mystyle={styles.offlineText} />
//         </View>
//     );
// }
// function MiniOnlineSign() {
//     return (
//         <View style={styles.onlineContainer}>
//             <FontBold value={i18n.t('noconnection')} mystyle={styles.onlineText} />
//         </View>
//     );
// }
// class OfflineNotice extends PureComponent {
//     state = {
//         isConnected: true
//     };
//     handleConnectivityChange = isConnected => {
//         this.setState({ isConnected });
//     }
//     componentDidMount() {
//         NetInfo.addEventListener((state) => { this.setState({ isConnected: state.isConnected }) });
//     }
//     componentWillUnmount() {
//         // NetInfo.removeEventListener();
//     }
//     render() {
//         if (!this.state.isConnected) {
//             return <MiniOfflineSign />;
//         }
//         else {
//             setTimeout(() => {
//                 return <MiniOnlineSign />
//             }, 3000);
//         }
//         return null;
//     }
// }
// const styles = StyleSheet.create({
//     offlineContainer: {
//         backgroundColor: '#b52424',
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         width,
//         position: 'absolute',
//         bottom: 0,
//         zIndex: 20
//     },
//     offlineText: {
//         color: '#fff'
//     },
//     onlineContainer: {
//         backgroundColor: 'green',
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         width,
//         position: 'absolute',
//         bottom: 0,
//         zIndex: 20
//     },
//     onlineText: {
//         color: '#fff'
//     },
// });
// export default OfflineNotice;



































import React, { PureComponent, Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import FontBold from '../components/FontBold';
import i18n from '../locales/i18n';
const { width } = Dimensions.get('window');
import Modal from 'react-native-modal';
import { Normalize, fontNormalize } from './actuatedNormalize';


export default class OfflineNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            showOfflineModal: false,
            showOnlineModal: false,
            countChanges: false
        };
    }
    handleConnectivityChange = (isConnected, showOfflineModal, showOnlineModal) => {
        this.setState({ isConnected, showOfflineModal, showOnlineModal });
    }
    componentDidMount() {
        NetInfo.addEventListener((state) => {
            this.setState({ isConnected: state.isInternetReachable });
            if (!state.isInternetReachable) {
                this.setState({ countChanges: true });
                this.setState({ showOfflineModal: true, showOnlineModal: false });
            }
            if (state.isInternetReachable) {
                this.setState({ showOfflineModal: false, showOnlineModal: true });
                setTimeout(() => {
                    this.setState({
                        showOnlineModal: false
                    })
                }, 3000);
            }
        });
    }
    componentWillUnmount() {
        // NetInfo.removeEventListener();
    }
    MiniOfflineSign = () => {
        return (
            <View>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={1200}
                    animationOutTiming={200}
                    avoidKeyboard={true}
                    backdropColor='transparent'
                    transparent={true}
                    isVisible={this.state.showOfflineModal}
                    hideModalContentWhileAnimating={false}
                    coverScreen={true}
                    // onBackdropPress={() => this.setState({ showOfflineModal: false })}
                    // zonBackButtonPress={() => this.props.setShowAddressesModal(false)}
                    // onSwipeComplete={() => this.props.setShowAddressesModal(false)}
                    // swipeThreshold={200}
                    // swipeDirection="down"
                    onRequestClose={() => {
                        // alert('Modal has been closed.');
                    }}>
                    <View style={styles.offlineContainer}>
                        <FontBold value={i18n.t('nointernetconnection')} mystyle={styles.offlineText} />
                    </View>
                </Modal>
            </View>

        );
    }
    MiniOnlineSign = () => {
        return (
            <View>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={1200}
                    animationOutTiming={200}
                    avoidKeyboard={true}
                    backdropColor='transparent'
                    transparent={true}
                    isVisible={this.state.showOnlineModal}
                    hideModalContentWhileAnimating={false}
                    coverScreen={true}
                    onBackdropPress={() => this.setState({ showOnlineModal: false })}
                    // onBackButtonPress={() => this.props.setShowAddressesModal(false)}
                    // onSwipeComplete={() => this.props.setShowAddressesModal(false)}
                    // swipeThreshold={200}
                    // swipeDirection="down"
                    onRequestClose={() => {
                        // alert('Modal has been closed.');
                    }}>
                    <View style={styles.onlineContainer}>
                        <FontBold value={i18n.t('yesinternetconnection')} mystyle={styles.onlineText} />
                    </View>
                </Modal>
            </View >
        );
    }
    render() {
        if (!this.state.isConnected) {
            // this.setState({ showOfflineModal: true, showOnlineModal: false });

            return this.MiniOfflineSign();
        }
        if (this.state.isConnected && this.state.countChanges) {
            // this.setState({ showOfflineModal: false, showOnlineModal: true });
            return this.MiniOnlineSign();
        }
        return null;
    }
}
const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: Normalize(30),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        bottom: 0
    },
    offlineText: {
        color: '#fff'
    },
    onlineContainer: {
        backgroundColor: 'green',
        height: Normalize(30),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        bottom: 0
    },
    onlineText: {
        color: '#fff'
    },
});