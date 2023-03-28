import { FirebaseContextProvider } from '@/context/FirebaseContext';

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <FirebaseContextProvider>
       
      <Component {...pageProps} />
     
    </FirebaseContextProvider>
  );
}
