import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';

// withAuthenticatorを使用すると、デフォルトのサインインUIが提供されます。
// withAuthenticatorは、サインイン、サインアップ、パスワードリセット、
// パスワード変更、サインアウト、およびユーザーの削除を処理します。
// AmplifyのwithAuthenticatorはすべての認証プロセスを自動化します。
// これらの機能は、AWS AmplifyのAuthクラスを使用して実装されています。

// 未認証のユーザーがこのコンポーネントにアクセスしようとすると、自動的にサインインフォームが表示されます。

const SignIn: React.FC = () => {
  return <div />;
};

export default withAuthenticator(SignIn);