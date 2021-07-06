import React, {useContext, useMemo} from 'react';
import {View, FlatList} from 'react-native';
import {AppContext} from '../context/AppContext';
import {FlipCard} from '../components';

const MechanicCardsScreen = ({route, navigation}) => {
  const {mechanicName} = route.params;
  const {cardsWithMechanics} = useContext(AppContext);

  // handle selected cards
  // we are using memoization because this calculation
  // ...doesn't need to re-run after in any state change
  const cards = useMemo(() => {
    const selectedCards = cardsWithMechanics.filter(item => {
      let filterResult = false;
      item.mechanics.forEach(mechanic => {
        if (mechanic.name === mechanicName) {
          filterResult = true;
        }
      });

      return filterResult;
    });

    return selectedCards;
  }, [cardsWithMechanics, mechanicName]);

  return (
    <View>
      <FlatList
        data={cards}
        initialNumToRender={4}
        windowSize={6}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => <FlipCard card={item} />}
      />
    </View>
  );
};

export default MechanicCardsScreen;
