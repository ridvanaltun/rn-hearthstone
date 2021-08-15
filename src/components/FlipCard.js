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

const PropTitle = ({title, prop}) => {
  return (
    <Text>
      <Text style={[styles.title]}>{`${title}: `}</Text>
      <Text style={[styles.prop]}>{`${prop || '?'}`}</Text>
    </Text>
  );
};

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
            <PropTitle title="Card Type" prop={card.type} />
            <PropTitle title="Card Rarity" prop={card.rarity} />
            <PropTitle title="Card Cost" prop={card.cost} />
            <PropTitle title="Card Set" prop={card.cardSet} />
            <PropTitle title="Card Attack" prop={card.attack} />
            <PropTitle title="Card Race" prop={card.race} />
            <PropTitle title="Card Player Class" prop={card.playerClass} />
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
    padding: 20,
    borderWidth: 1,
  },
  cardName: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  prop: {
    fontSize: 20,
  },
});

export default FlipCard;
