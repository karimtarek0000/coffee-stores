import Image from "next/image";
import Link from "next/link";
import Style from "../styles/card.module.css";
import { CoffeeStoreCard } from "../types";

const { card } = Style;

const Card = ({ item }: { item?: CoffeeStoreCard }): JSX.Element => {
  const { id, name, imgUrl } = item;

  return (
    <Link key={id} href={`/coffee-shop/${id}`} className={card}>
      <h3>{name}</h3>
      <Image
        src={
          imgUrl ||
          "https://images.unsplash.com/photo-1551529834-525807d6b4f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80"
        }
        alt={name}
        width={400}
        height={300}
        style={{ objectFit: "cover", maxWidth: "100%" }}
      />
    </Link>
  );
};

export default Card;
