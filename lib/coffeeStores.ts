import { createApi } from "unsplash-js";
import { CoffeeStoreCardDetails } from "../types";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getUrlCoffeeStores = (latLong: string, query: string, limit: number) => {
  return `${process.env.NEXT_PUBLIC_FOURSQUER_URL}/search?${query}=coffee&ll=${latLong}&limit=${limit}`;
};

const getCoffeeStoresPhotos = async (): Promise<string[]> => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
    orientation: "portrait",
  });

  return photos.response.results.map((photo) => photo.urls["small"]);
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUER_API_KEY,
  },
};

export const fetchCoffeeStores = async (
  latLong: string = "38.86851624661457,-77.14574038118371",
  limit: number = 8
): Promise<CoffeeStoreCardDetails[]> => {
  const coffeeStoresPhotos = await getCoffeeStoresPhotos();

  const coffeeStoresData: any = await fetch(getUrlCoffeeStores(latLong, "coffee", limit), options);
  const coffeeStores = await coffeeStoresData.json();

  return coffeeStores.results?.map((coffee: any, index: number) => {
    return {
      id: coffee.fsq_id,
      name: coffee.name,
      location: coffee.location.formatted_address,
      vote: 0,
      imgUrl: coffeeStoresPhotos.length ? coffeeStoresPhotos[index] : null,
    };
  });
};
