import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchCoffeeStores } from "../../lib/coffeeStores";
import Style from "../../styles/details.module.css";
import { CoffeeStoreCardDetails } from "../../types";

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

  return {
    props: {
      coffeeStore: coffeeStores.find((coffee: any) => coffee.id === params.id),
    },
  };
};

const CoffeeShopDetails = ({
  coffeeStore,
}: {
  coffeeStore: CoffeeStoreCardDetails;
}): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) return <h1>Loading...</h1>;

  const { name, location, timezone, imgUrl } = coffeeStore;

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={location.formatted_address} />
      </Head>

      <main className="container">
        <section className={detailsWrapper}>
          <div>
            <button onClick={() => router.back()} className={btnBack}>
              &larr; back to home
            </button>
            <Image
              src={imgUrl}
              alt={name}
              width={700}
              height={400}
              style={{ objectFit: "cover", maxWidth: "100%" }}
            />
          </div>

          <div className={info}>
            <h2>{name}</h2>
            <h2>{location.formatted_address}</h2>
            <h2>{timezone}</h2>
          </div>
        </section>
      </main>
    </>
  );
};

export default CoffeeShopDetails;
