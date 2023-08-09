// pages/receiveHeader.js
import { GetServerSideProps } from 'next';

type ReceiveHeaderProps = {
  customHeaderValue: string;
};

const ReceiveHeader = (props: ReceiveHeaderProps) => {
  return (
    <div>
      <h1>Received custom header:</h1>
      <p>{props.customHeaderValue}</p>
    </div>
  );
};

export default ReceiveHeader;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const customHeaderValue = context.req.headers['app-type'] as string || 'Header not found';
  return {
    props: { customHeaderValue },
  };
};
