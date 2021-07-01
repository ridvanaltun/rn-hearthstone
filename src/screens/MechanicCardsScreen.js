import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import {AppContext} from '../context/AppContext';
import {FlipCard} from '../components';

const MechanicCardsScreen = ({route, navigation}) => {
  const {mechanicName} = route.params;
  const {cardsWithMechanics} = useContext(AppContext);

  // handle selected cards
  const selectedCards = cardsWithMechanics.filter(item => {
    let filterResult = false;
    item.mechanics.forEach(mechanic => {
      if (mechanic.name === mechanicName) {
        filterResult = true;
      }
    });
    return filterResult;
  });

  return (
    <View>
      <FlatList
        data={selectedCards}
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
