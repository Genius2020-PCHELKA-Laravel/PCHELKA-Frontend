import React from 'react';
import { LiqpayCheckout } from 'react-native-liqpay';
import { Button, View } from 'react-native';

class LiqpayComponent extends React.Component {
    state = {
        showCheckout: false,
    }

    renderCheckout() {
        return (
            <LiqpayCheckout
                privateKey="sandbox_1VRjcTX9R2TJpwx1KQYMoMZ1amS8aUBf8v2Rlqnj"
                params={{
                    public_key: 'sandbox_i10775795020',
                    action: 'pay', // Possible values: 'pay' - payment, 'hold' - blocking funds on the sender's account, 'subscribe' - regular payment, 'paydonate' - donation, auth - preauthorization of the card
                    version: '3', // API version
                    amount: '10',
                    currency: 'UAH',
                    description: 'description text',
                    order_id: 'order_id_X', // The maximum length is 255 characters
                    product_description: 'product_description',
                    sandbox: '1', // for testing
                }}
                onLiqpaySuccess={res => {
                    console.log(res);
                }}
                onLiqpayError={error => {
                    console.error(error);
                }}
            />
        );
    }

    render() {
        return (
            <View>
                <Button title="Pay" onPress={() => this.showCheckout()} />
                {this.state.showCheckout && this.renderCheckout()}
            </View>
        );
    }
}

export default LiqpayComponent;