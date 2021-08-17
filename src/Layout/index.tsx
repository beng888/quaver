import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Modal from "./Modal";
import MessengerCustomerChat from "react-messenger-customer-chat";

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div
      className={`${pathname === "/[cakes]" && "md:block"} ${
        pathname === "/[cakes]" && "md:max-w-max"
      } min-h-screen max-w-[100vw]  overflow-x-hidden bg-pink-50 flex flex-col `}
    >
      {pathname !== "/[cakes]/[slug]" && <Navbar />}

      {pathname === "/" && <Modal />}
      {children}

      {pathname !== "/[cakes]/[slug]" && <Footer pathname={pathname} />}

      <MessengerCustomerChat pageId="150793413803258" appId="293340379212840" />
    </div>
  );
}
