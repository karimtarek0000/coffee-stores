import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context";
import { fetchCoffeeStores } from "../../lib/coffeeStores";
import Style from "../../styles/details.module.css";
import { CoffeeStoreCardDetails } from "../../types";
import { isObjEmpty } from "../../utils";
import RenderSVG from "../../components/shared/RenderSVG";

const { detailsWrapper, title, btnBack, info, imageWrapper, voteBtn } = Style;

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
  const [voteCount, setVote] = useState<number>(0);
  const id = router.query.id;

  const votingCountHandler = () => setVote((vote) => (vote += 1));

  const createCoffeeStoreHandler = async (
    coffeeStoreData: CoffeeStoreCardDetails
  ): Promise<void> => {
    try {
      const res = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(coffeeStoreData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isObjEmpty(_coffeeStore)) {
      const coffeeStoreExist: CoffeeStoreCardDetails = store.coffeeStores.find(
        (shop) => shop.id === id
      );
      if (coffeeStoreExist) {
        createCoffeeStoreHandler(coffeeStoreExist);
        setCoffeeStores(coffeeStoreExist);
      }
    } else {
      // SSG
      createCoffeeStoreHandler(_coffeeStore);
    }
  }, [_coffeeStore, id, store.coffeeStores]);

  if (router.isFallback) {
    return (
      <h1 className="container" style={{ textAlign: "center", marginTop: "20px" }}>
        Loading...
      </h1>
    );
  }

  const { name, location, imgUrl, vote } = _coffeeStore;

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
            <h2 className={title}>{name}</h2>
            <div className={imageWrapper}>
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
          </div>

          <div className={info}>
            <h2 className="flex">
              <RenderSVG name="map" size="2rem" />
              {location}
            </h2>
            <h2 className="flex">
              <RenderSVG name="vote" size="2rem" />
              {voteCount}
            </h2>
            <button onClick={votingCountHandler} className={voteBtn}>
              vote now
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default CoffeeShopDetails;
