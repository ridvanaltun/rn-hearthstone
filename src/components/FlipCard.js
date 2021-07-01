import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import {Computed, Images} from '../constants';

const FlipCard = ({card}) => {
  let animatedValue = new Animated.Value(0);
  let val = 0;

  animatedValue.addListener(({value}) => {
    val = value;
  });

  let frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  let backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  let frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  let backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  let elevationFront = animatedValue.interpolate({
    inputRange: [0, 25],
    outputRange: [10, 0],
  });

  let elevationBack = animatedValue.interpolate({
    inputRange: [155, 180],
    outputRange: [0, 10],
  });

  const flipCard = () => {
    if (val >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  };

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => flipCard()}>
      <View>
        <Animated.View
          style={[
            frontAnimatedStyle,
            styles.flipCard,
            {elevation: elevationFront},
            {opacity: frontOpacity},
          ]}>
          <Image
            style={[styles.flipCard]}
            source={card.img ? {uri: card.img} : {uri: Images.NO_IMAGE}}
          />
        </Animated.View>
        <Animated.View
          style={[
            backAnimatedStyle,
            styles.flipCardBack,
            {elevation: elevationBack},
            {opacity: backOpacity},
          ]}>
          <View style={[styles.flipCard, styles.flipCardBackContext]}>
            <Text>{`Card Type: ${card.type || '?'}`}</Text>
            <Text>{`Card Rarity: ${card.rarity || '?'}`}</Text>
            <Text>{`Card Cost: ${card.cost || '?'}`}</Text>
            <Text>{`Card Set: ${card.cardSet || '?'}`}</Text>
            <Text>{`Card Attack: ${card.attack || '?'}`}</Text>
            <Text>{`Card Race: ${card.race || '?'}`}</Text>
            <Text>{`Card Player Class: ${card.playerClass || '?'}`}</Text>
          </View>
        </Animated.View>
        <Text style={styles.cardName}>{card.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flipCard: {
    width: Computed.IMAGE_WIDTH,
    height: Computed.IMAGE_HEIGHT,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    top: -Computed.IMAGE_HEIGHT,
  },
  flipCardBackContext: {
    position: 'absolute',
    paddingTop: 100,
    left: 10,
  },
  cardName: {
    fontSize: 20,
  },
});

export default FlipCard;
