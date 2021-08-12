import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import dynamic from "next/dynamic";

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;

  const Modal = dynamic(() => import("./Modal"));

  return (
    <div className="min-h-screen bg-pink-50 ">
      {pathname !== "/[cakes]/[slug]" && <Navbar />}

      {pathname === "/" && <Modal />}

      {children}

      {pathname !== "/[cakes]/[slug]" && <Footer pathname={pathname} />}
    </div>
  );
}
