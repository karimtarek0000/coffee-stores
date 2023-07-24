import Style from "../styles/footer.module.css";

const { footer } = Style;

const Footer = (): JSX.Element => {
  return (
    <footer className={footer}>
      <p className="text-center">
        all rights reserved &copy; {new Date().getFullYear()} karim tarek
      </p>
    </footer>
  );
};

export default Footer;
