import React, {useState, createContext} from 'react';

export const AppContext = createContext();

const AppContextProvider = props => {
  const [cardsWithMechanics, setCardsWithMechanics] = useState([]);

  return (
    <AppContext.Provider value={{cardsWithMechanics, setCardsWithMechanics}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
