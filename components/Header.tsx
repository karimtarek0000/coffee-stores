import Image from "next/image";
import { MouseEventHandler } from "react";
import Style from "../styles/header.module.css";

const { info, title, desc, discoverStoreBtn } = Style;

type HeaderProps = {
  locationHandler: MouseEventHandler;
  loading: boolean;
  locationErrorMsg: string;
};

const Header = ({ locationHandler, loading, locationErrorMsg }: HeaderProps): JSX.Element => {
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
        <button disabled={loading} onClick={locationHandler} className={discoverStoreBtn}>
          {loading ? "Locating..." : "view stores nearby"}
        </button>
        {locationErrorMsg && <p>Something Wrong {locationErrorMsg}</p>}
      </div>
    </header>
  );
};

export default Header;
