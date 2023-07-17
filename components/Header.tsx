import Image from "next/image";
import Style from "../styles/header.module.css";

const { info, title, desc, discoverStoreBtn } = Style;

const Header = (): JSX.Element => {
  return (
    <header className="position-rl">
      <Image
        src="/images/header/header.jpg"
        alt="header"
        style={{ objectFit: "cover", objectPosition: "bottom", maxWidth: "100%" }}
        width={1920}
        height={700}
        placeholder="empty"
      />
      <div className={info}>
        <h1 className={title}>Coffee Stores</h1>
        <p className={desc}>Discover your local coffee stores!</p>
        <button className={discoverStoreBtn}>view stores nearby</button>
      </div>
    </header>
  );
};

export default Header;
