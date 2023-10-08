import React, { useEffect } from 'react';
import { isLocalhost } from '@/pages/utils/ua';


const Test:React.FC =()=> {

  useEffect(() => {
    isLocalhost();
  }, []);

  console.log(isLocalhost());

  return (
    <div>
      Enter your code here
    </div>
  );
}

export default Test;