import { NextApiRequest, NextApiResponse } from "next";
import { coffeeStoreTable } from "../../lib/airtable";

const favoritCoffeeStoreById = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const id = req.query.id;

    if (id) {
      try {
        // Find if this id exist
        const coffeeStores: any = await coffeeStoreTable
          .select({ filterByFormula: `id="${id}"` })
          .firstPage();

        if (coffeeStores.length) {
          const vote = parseInt(coffeeStores[0].fields.vote) + 1;

          const updateRecord = await coffeeStoreTable.update([
            {
              id: coffeeStores[0].id,
              fields: {
                vote,
              },
            },
          ]);

          return updateRecord
            ? res.status(200).json({
                message: "Has been updated vote successfully",
                data: updateRecord[0].fields,
              })
            : res.status(400).json({ message: "Error happend when updating the vote" });
        }

        res.status(401).json({ message: "This id not match any coffee store please check again!" });
      } catch (error) {
        res.status(400).json({ message: "Error", error });
      }
    } else {
      res.status(400).json({ message: "Id not exist!" });
    }
  }
};

export default favoritCoffeeStoreById;
