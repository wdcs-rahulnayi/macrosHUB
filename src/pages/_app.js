
import { useRouter } from 'next/router';
import { UserProvider } from '@/context/UserContext';
import '@/styles/globals.css';
import Header from '@/components/Header';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isAuthPage = router.pathname === '/signup' || router.pathname === '/login' || router.pathname === '/';
  
  return (
    <>
      <UserProvider>
      {!isAuthPage && <Header />}

        <Component {...pageProps} />
        
      </UserProvider>
    </>
  );
}
