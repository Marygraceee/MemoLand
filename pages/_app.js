import MobileNav from "@/components/MobileNav";
import { FirebaseContextProvider } from "@/context/FirebaseContext";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <FirebaseContextProvider>
      <MobileNav />
      <Component {...pageProps} />
    </FirebaseContextProvider>
  );
}
