import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const fontscale = SCREEN_WIDTH / 320;
const scale = SCREEN_WIDTH / 375;

export const fontNormalize = (size) => {
    const newSize = size * fontscale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
export const Normalize = (size) => {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
export const sliderNormalizeWidth = () => {
    const newWidth = SCREEN_WIDTH
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newWidth))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newWidth)) - 2
    }
}

export const sliderNormalizeHeight = () => {
    const newHeight = SCREEN_HEIGHT / 4
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newHeight))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newHeight)) - 2
    }
}