import { ReactNode } from "react";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
