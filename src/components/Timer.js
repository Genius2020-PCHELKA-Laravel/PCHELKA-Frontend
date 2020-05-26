import React from 'react';
import { Button, TouchableOpacity, View, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

export default class Timer extends React.Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 59 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.startTimer();
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }
    componentWillUnmount() {
        console.log("####################Unmount Timer");
        this.props.onclick = null;
        this.setState({ time: {}, seconds: 0 });
        this.startTimer.bind(null);
        this.countDown.bind(null);
    }
    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        if (this.state.seconds <= 0)
            this.state.seconds = 59;
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                {
                    this.state.seconds === 0 ?
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.props.onclick();
                                this.state = { time: {}, seconds: 59 };
                                this.timer = 0;
                                this.startTimer();
                            }}>
                            <FontAwesome5 name="sync-alt" size={25} color="#161924" />
                        </TouchableOpacity> : null
                }
                <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 14, fontFamily: 'Comfortaa-Bold', alignItems: 'center', justifyContent: 'center' }}>
                    {this.state.time.s} seconds
                </Text>
            </View>
        );
    }
}
