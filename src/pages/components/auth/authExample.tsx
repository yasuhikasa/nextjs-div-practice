import React, { useState, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';
import Button from '../button/button';

// 認証がなされていないと、コンポーネントを表示しないとする実装例です。
// この例では、認証されているかどうかをチェックするために、
// Auth.currentAuthenticatedUser()を使用しています。
// この関数は、現在認証されているユーザーを返します。
// 認証されていない場合は、例外がスローされます。
// この例では、Auth.currentAuthenticatedUser()が例外をスローした場合、
// isAuthenticatedをfalseに設定しています。
// これにより、コンポーネントがレンダリングされなくなります。
// この例では、useEffectフックを使用して、
// ページがロードされたときに認証状態をチェックしています。
// これにより、ページがロードされるたびに、
// ユーザーが認証されているかどうかをチェックできます。

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
    }
  }

  return (
    <>
      {isAuthenticated && (<Button title='認証されています' />
      )}
    </>
  );
};

export default Navigation;
