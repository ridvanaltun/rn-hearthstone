import axios from 'axios';
import {Enums} from '../constants';

const instance = axios.create({
  baseURL: `https://${Enums.SECRETS.RAPIDAPI_HOST}`,
  timeout: 2000, // in ms
  headers: {
    'x-rapidapi-key': Enums.SECRETS.RAPIDAPI_KEY,
    'x-rapidapi-host': Enums.SECRETS.RAPIDAPI_HOST,
  },
});

export const SearchCard = (query, cancelToken) => {
  return new Promise((resolve, reject) => {
    instance
      .get(`/cards/search/${query}`, {
        cancelToken: cancelToken.token,
      })
      .then(response => {
        // check request errors
        if (response.status === 404) {
          reject(new Error('No card found!'));
        } else if (response.status !== 200) {
          reject(new Error('Promise chain cancelled'));
        }

        return response;
      })
      .then(response => {
        // returns response body as json object
        return response.data;
      })
      .then(json => {
        // eleminate cards type
        const cardsPool = Object.values(json);

        // remove empty arrays which coming from empty card types
        const reducer = (acc, currValue) => acc.concat(currValue);
        const cards = cardsPool.reduce(reducer, []);

        resolve(cards);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          reject(error);
        }
      });
  });
};

export const AllCards = () => {
  return new Promise((resolve, reject) => {
    instance
      .get('/cards')
      .then(response => {
        // returns response body as json object
        return response.data;
      })
      .then(json => {
        // eleminate cards type
        const cardsPool = Object.values(json);

        // remove empty arrays which coming from empty card types
        const reducer = (acc, currValue) => acc.concat(currValue);
        const cards = cardsPool.reduce(reducer, []);

        return cards;
      })
      .then(cards => {
        // returns cards which has mechanics
        const cardsWithMechanics = cards.filter(card => !!card.mechanics);

        resolve(cardsWithMechanics);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};
