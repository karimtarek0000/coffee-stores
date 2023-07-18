export type CoffeeStoreCardDetails = {
  id: string;
  name: string;
  location: string;
  vote: number;
  imgUrl: string;
};

export type CoffeeStoreCard = {
  id: string;
  name: string;
  imgUrl: string;
};

export type CoffeeStoresCard = {
  coffeeStores: CoffeeStoreCard[];
};
