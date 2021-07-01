import {Dimensions} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = WINDOW_WIDTH - 40;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.51;

export default {
  WINDOW_WIDTH,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
};
