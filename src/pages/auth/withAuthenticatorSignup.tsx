import React from 'react';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

// getServerSidePropsがSSR（サーバサイドレンダリング）を実行し、
// 既にログインしているユーザーがこのサインアップページを訪れた場合、ホームページにリダイレクト

// 既にログインしているユーザーがサインアップページを訪れた場合にホームページにリダイレクトされると同時に、
// withAuthenticatorが提供するデフォルトのサインアップUIが利用できるようになります。
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } catch (err) {
    return {
      props: {}, // ログインしていない場合は何も返さない
    }
  }
};

const SignUp: React.FC = () => {
  return <div />;
};

export default withAuthenticator(SignUp);
