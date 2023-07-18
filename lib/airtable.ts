import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_ID);

export const coffeeStoreTable = base("coffee-stores");
