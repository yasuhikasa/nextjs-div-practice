import React, { useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';
import { useRouter } from 'next/router';


//ログアウトの操作を行った後に、ユーザーをサインインページにリダイレクトしています。


const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await Auth.signOut();
        router.push('/auth/signIn');
      } catch (error) {
        console.error('Error signing out: ', error);
      }
    })();
  }, [router]);

  return <div>Logging out...</div>;
};

export default Logout;
