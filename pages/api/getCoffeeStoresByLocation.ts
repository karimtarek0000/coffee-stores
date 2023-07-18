import { NextApiRequest, NextApiResponse } from "next";
import { fetchCoffeeStores } from "../../lib/coffeeStores";
import { CoffeeStoreCardDetails } from "../../types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { latLong, limit } = req.query as unknown as { latLong: string; limit: number };

    const coffeeStores: CoffeeStoreCardDetails[] = await fetchCoffeeStores(latLong, limit);

    res.status(200).json({ coffeeStores });
  } catch (error) {
    res.status(400).json({ message: `Error ${error.message}` });
  }
}
