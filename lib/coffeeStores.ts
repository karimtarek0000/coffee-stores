import { createApi } from "unsplash-js";
import { CoffeeStoreCardDetails } from "../types";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

const getUrlCoffeeStores = (latLong: string, query: string, limit: number) => {
  return `${process.env.FOURSQUER_URL}/search?${query}=coffee&ll=${latLong}&limit=${limit}`;
};

const getCoffeeStoresPhotos = async (): Promise<string[]> => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 8,
    orientation: "portrait",
  });

  return photos.response.results.map((photo) => photo.urls["small"]);
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.FOURSQUER_API_KEY,
  },
};

export const fetchCoffeeStores = async (): Promise<CoffeeStoreCardDetails[]> => {
  const coffeeStoresPhotos = await getCoffeeStoresPhotos();

  const coffeeStoresData: any = await fetch(
    getUrlCoffeeStores("42.898800650530795,-75.93571028480666", "coffee", 8),
    options
  );
  const coffeeStores = await coffeeStoresData.json();

  return coffeeStores.results.map((coffee: any, index: number) => {
    return {
      ...coffee,
      id: coffee.fsq_id,
      imgUrl: coffeeStoresPhotos.length ? coffeeStoresPhotos[index] : null,
    };
  });
};
