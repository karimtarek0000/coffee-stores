import { NextApiRequest, NextApiResponse } from "next";
import { coffeeStoreTable } from "../../lib/airtable";

const getCoffeeStoreById = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.id;

    if (id) {
      try {
        const coffeeStore = await coffeeStoreTable
          .select({ filterByFormula: `id="${id}"` })
          .firstPage();

        if (coffeeStore?.length) return res.status(200).json({ data: coffeeStore[0].fields });

        res.status(404).json({ message: "This id not match any coffee store!" });
      } catch (error) {
        res.status(400).json({ message: "Something wrong", error });
      }
    } else {
      res.status(400).json({ message: "Id is missing" });
    }
  }
};

export default getCoffeeStoreById;
