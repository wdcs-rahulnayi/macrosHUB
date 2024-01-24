import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';

const PrivateRoute = (WrappedComponent) => {
  return (props) => {
    const { user } = useUser();
    const router = useRouter();
    console.log('private route triggered')
    useEffect(() => {
      // Check if the user is not logged in
      if (!user) {
        // Redirect to the login page
        router.push('/');
      }
    }, [user, router]);

    // Render the wrapped component if the user is logged in
    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default PrivateRoute;
