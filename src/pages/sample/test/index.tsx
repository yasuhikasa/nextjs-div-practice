// import React, { useEffect } from 'react';
// import { isLocalhost } from '@/pages/utils/ua';


// const Test:React.FC =()=> {

//   useEffect(() => {
//     isLocalhost();
//   }, []);

//   console.log("result",isLocalhost());

//   return (
//     <div>
//       Enter your code here
//     </div>
//   );
// }

// export default Test;

// pages/index.tsx
import { getClientIp, isLocalhost } from '@/pages/utils/ua';
import { NextPage } from 'next';

const HomePage: NextPage<{ ip: string; isLocal: boolean }> = ({ ip, isLocal }) => {
  return (
    <div>
      <p>クライアントのIPアドレス: {ip}</p>
      <p>ローカルホスト: {isLocal ? 'はい' : 'いいえ'}</p>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const ip = getClientIp(context.req);
  const isLocal = isLocalhost(context.req);

  return {
    props: {
      ip,
      isLocal
    }
  };
};

export default HomePage;
