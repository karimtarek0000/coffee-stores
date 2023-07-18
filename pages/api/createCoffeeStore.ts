import { NextApiRequest, NextApiResponse } from "next";
import { coffeeStoreTable } from "../../lib/airtable";

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { id, name, ...otherData } = req.body;

      if (id) {
        // Find if this id exist
        const coffeeStores: any = await coffeeStoreTable
          .select({ filterByFormula: `id="${id}"` })
          .firstPage();

        // If not exist create new one
        if (!coffeeStores.length) {
          // If name exist
          if (name) {
            const coffeeStoreCreated = await coffeeStoreTable.create([
              {
                fields: { id, name, ...otherData },
              },
            ]);
            return res.status(201).json({
              message: "Created coffee store successfully",
              data: coffeeStoreCreated[0].fields,
            });
          }
          res.status(400).json({ message: "name is missing!" });
        }

        return res.status(200).json({ message: "Coffee store", data: coffeeStores[0].fields });
      } else {
        res.status(400).json({ message: "Id is missing!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error creating or finding coffee store", error });
    }
  }
};

export default createCoffeeStore;
