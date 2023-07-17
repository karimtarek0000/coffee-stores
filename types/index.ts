export type CoffeeStoreCardDetails = {
  name: string;
  location: string;
  timezone: string;
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
