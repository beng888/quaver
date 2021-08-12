import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Modal from "./Modal";
import MessengerCustomerChat from "react-messenger-customer-chat";

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="min-h-screen bg-pink-50 ">
      {pathname !== "/[cakes]/[slug]" && <Navbar />}

      {pathname === "/" && <Modal />}

      {children}

      {pathname !== "/[cakes]/[slug]" && <Footer pathname={pathname} />}

      <MessengerCustomerChat
        pageId="100000686899395"
        appId="293340379212840"
        // htmlRef="<REF_STRING>"
      />
    </div>
  );
}
