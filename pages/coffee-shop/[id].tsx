import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchCoffeeStores } from "../../lib/coffeeStores";
import Style from "../../styles/details.module.css";
import { CoffeeStoreCardDetails } from "../../types";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context";
import { isObjEmpty } from "../../utils";

const { detailsWrapper, btnBack, info } = Style;

export const getStaticPaths: GetStaticPaths<any> = async () => {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((coffee: any) => {
    return { params: { id: coffee.id } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const coffeeStores = await fetchCoffeeStores();
  const coffeeStoreData = coffeeStores.find((coffee: any) => coffee.id === params.id);

  return {
    props: {
      coffeeStore: !!coffeeStoreData ? coffeeStoreData : {},
    },
  };
};

const CoffeeShopDetails = ({
  coffeeStore,
}: {
  coffeeStore: CoffeeStoreCardDetails;
}): JSX.Element => {
  const router: any = useRouter();
  const { store } = useContext(StoreContext);
  const [_coffeeStore, setCoffeeStores] = useState(coffeeStore);

  useEffect(() => {
    if (isObjEmpty(_coffeeStore))
      setCoffeeStores(store.coffeeStores.find((shop) => shop.id === router.query.id));
  }, [_coffeeStore, router.query.id, store.coffeeStores]);

  if (router.isFallback) {
    return (
      <h1 className="container" style={{ textAlign: "center", marginTop: "20px" }}>
        Loading...
      </h1>
    );
  }

  const { name, location, timezone, imgUrl } = _coffeeStore;

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={location} />
      </Head>

      <main className="container">
        <section className={detailsWrapper}>
          <div>
            <button onClick={() => router.back()} className={btnBack}>
              &larr; back to home
            </button>
            <Image
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1551529834-525807d6b4f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80"
              }
              alt={name || ""}
              width={700}
              height={400}
              style={{ objectFit: "cover", maxWidth: "100%" }}
            />
          </div>

          <div className={info}>
            <h2>{name}</h2>
            <h2>{location}</h2>
            <h2>{timezone}</h2>
          </div>
        </section>
      </main>
    </>
  );
};

export default CoffeeShopDetails;
