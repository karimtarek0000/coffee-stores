import Head from "next/head";
import Card from "../components/Card";
import { fetchCoffeeStores } from "../lib/coffeeStores";
import StyleCard from "../styles/card.module.css";
import { CoffeeStoresCard } from "../types";
import Header from "../components/Header";

const { cardsWrapper } = StyleCard;

export const getStaticProps = async () => {
  const coffeeStores = await fetchCoffeeStores();

  return { props: { coffeeStores } };
};

export default function Home(props: CoffeeStoresCard) {
  const { coffeeStores } = props;

  const renderCards = coffeeStores.map((store) => <Card key={store.id} store={store} />);

  return (
    <main className="overflow-hid">
      <Head>
        <title>This is a next js</title>
      </Head>

      <Header />

      <main className="container">
        <section className={cardsWrapper}>{renderCards}</section>
      </main>
    </main>
  );
}
