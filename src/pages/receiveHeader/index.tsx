import { GetServerSideProps } from 'next';

type ReceiveHeaderProps = {
  customHeaderValue: string;
  mobileHeaderValue: string;
};

const ReceiveHeader = (props: ReceiveHeaderProps) => {
  return (
    <div>
      <h1>Received custom header:</h1>
      <p>Web:{props.customHeaderValue}</p>
      <p>Mobile:{props.mobileHeaderValue}</p>
    </div>
  );
};

export default ReceiveHeader;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // バックエンドからヘッダー情報を取得
  const res = await fetch('http://localhost:3001/send');
  const mobileRes = await fetch('http://localhost:3001/receiveHeader');
  const data = await res.json();
  const mobileData = await mobileRes.json();
  return {
    props: { customHeaderValue: data.customHeader || 'Header not found' ,
    mobileHeaderValue: mobileData.customHeader || 'Header not found'},
  };
};




// import { GetServerSideProps } from 'next';

// type ReceiveHeaderProps = {
//   customHeaderValue: string;
// };

// const ReceiveHeader = (props: ReceiveHeaderProps) => {
//   return (
//     <div>
//       <h1>Received custom header:</h1>
//       <p>{props.customHeaderValue}</p>
//     </div>
//   );
// };

// export default ReceiveHeader;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ヘッダー情報を取得
//   const customHeaderValue = context.req.headers['app-type'] as string || 'Header not found';

//   // コンソールに出力
//   console.log('Received custom header in B app:', customHeaderValue);

//   return {
//     props: { customHeaderValue },
//   };
// };




// import { GetServerSideProps } from 'next';

// type ReceiveHeaderProps = {
//   customHeaderValue: string;
// };

// const ReceiveHeader = (props: ReceiveHeaderProps) => {
//   return (
//     <div>
//       <h1>Received custom header:</h1>
//       <p>{props.customHeaderValue}</p>
//     </div>
//   );
// };

// export default ReceiveHeader;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const customHeaderValue = context.req.headers['app-type'] as string || 'Header not found';
//   return {
//     props: { customHeaderValue },
//   };
// };



//モバイルアプリの場合
// import { GetServerSideProps } from 'next';

// type ReceiveHeaderProps = {
//   customHeaderValue: string;
// };

// const ReceiveHeader = ({ customHeaderValue }: ReceiveHeaderProps) => (
//   <div>
//     <h1>Received custom header:</h1>
//     <p>{customHeaderValue}</p>
//   </div>
// );

// export default ReceiveHeader;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // バックエンドからヘッダー情報を取得
//   const response = await fetch('http://localhost:3001/receiveHeader');
//   const customHeaderValue = await response.text();

//   return {
//     props: { customHeaderValue },
//   };
// };
