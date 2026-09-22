import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getUser } from "../redux/api/userAPI";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { store, RootState } from "../redux/store";
import Header from "../components/header";
import Footer from "../components/footer";
import Loader from "../components/loader";
import CartDrawer from "../components/CartDrawer";
import "../styles/app.scss";

const AppContent = ({ Component, pageProps, router }: AppProps) => {
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const data = await getUser(firebaseUser.uid);
          dispatch(userExist(data.user));
        } catch {
          dispatch(userNotExist());
        }
      } else {
        dispatch(userNotExist());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Solution Systems - Laptop &amp; Computer Repair | Mumbai • MMR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Solution Systems offers expert laptop, computer &amp; MacBook repair services, certified components, and doorstep pickup across Mumbai, Thane, and Palghar. Call +91 86552 08382."
        />
        <link rel="canonical" href="https://solutionsystems.in/" />
        <meta property="og:url" content="https://solutionsystems.in/" />
        <meta property="og:site_name" content="Solution Systems" />
      </Head>
      <Header user={user} />
      {!mounted || loading ? <Loader /> : <Component {...pageProps} />}
      <CartDrawer />
      <Footer />
      <Toaster position="bottom-center" />
    </>
  );
};

export default function MyApp(props: AppProps) {
  return (
    <Provider store={store}>
      <AppContent {...props} />
    </Provider>
  );
}
