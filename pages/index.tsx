import Head from "next/head";
import { MouseEventHandler, useCallback, useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import RenderComponents from "../components/RenderComponents";
import { StoreContext } from "../context";
import useTrackLocation from "../hooks/useTrackLocation";
import { fetchCoffeeStores } from "../lib/coffeeStores";
import StyleCard from "../styles/card.module.css";
import { CoffeeStoresCard } from "../types";

const { cardsWrapper } = StyleCard;

export const getStaticProps = async () => {
  const coffeeStores = await fetchCoffeeStores();

  return { props: { coffeeStores } };
};

export default function Home(props: CoffeeStoresCard) {
  const { coffeeStores } = props;
  const { store, dispatch } = useContext(StoreContext);
  const { latLong, locationErrorMsg, isFindLocation, trackLocationHandler } = useTrackLocation();
  const [loadingCoffeeStores, setLoadingCoffeeStores] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const getCoffeeStoresNearby = useCallback(async () => {
    try {
      setLoadingCoffeeStores(true);
      setErrorMsg("");

      const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=20`);
      const { coffeeStores } = await res.json();

      dispatch({ type: "coffeeStores", payload: { coffeeStores } });
      dispatch({ type: "latLong", payload: { latLong } });
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoadingCoffeeStores(false);
    }
  }, [dispatch, latLong]);

  useEffect(() => {
    if (latLong) getCoffeeStoresNearby();
  }, [getCoffeeStoresNearby, latLong]);

  const locationHandler: MouseEventHandler = (): void => trackLocationHandler();

  return (
    <main className="overflow-hid">
      <Head>
        <title>Coffee Stores</title>
        <meta name="description" content="Discover coffee stores near you." />
      </Head>

      <Header
        locationHandler={locationHandler}
        loading={isFindLocation || loadingCoffeeStores}
        locationErrorMsg={locationErrorMsg}
      />

      <main className="container">
        {store.coffeeStores.length ? <h2 className="headTitle">Coffee stores near me</h2> : null}
        {errorMsg ? <p>{errorMsg}</p> : null}
        <section className={cardsWrapper}>
          <RenderComponents items={store.coffeeStores}>
            <Card />
          </RenderComponents>
        </section>

        <h2 className="headTitle">Washington</h2>
        <section className={cardsWrapper}>
          <RenderComponents items={coffeeStores}>
            <Card />
          </RenderComponents>
        </section>
      </main>
    </main>
  );
}
