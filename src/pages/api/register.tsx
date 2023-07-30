import { Auth } from 'aws-amplify';

export interface User {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | '';
  dateOfBirth: string;
  job: string;
}

function generateRandomString(length:number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const password = generateRandomString(10);

export const createUser = async (user: User) => {
  try {
    const { user: cognitoUser } = await Auth.signUp({
      username: user.email,
      password: password,  // これは初期パスワードで、ユーザーによって変更されるべきです。
      attributes: {
        email: user.email,
        phone_number: user.phone,
        given_name: user.firstName,
        family_name: user.lastName,
        // その他必要な属性
      },
    });

    return cognitoUser;
  } catch (error) {
    console.error('Error signing up', error);
    throw error;
  }
};


// AWS AmplifyとCognitoは、エンドユーザーが自己サービスでアカウントを作成し、
// 認証プロセスを通じて自分のアカウントを確認・管理するシナリオを前提として設計されています。
// この場合、ユーザーがサインアップするとCognitoは一時的なパスワードを生成し、そのパスワードをユーザーにメールで送信します。
// 一方で、開発者や管理者が複数のユーザーをバッチで登録する場合など、
// 自己サービスでないシナリオでは、一時的なパスワードの生成や通知など、
// いくつかのプロセスについては自分でカスタマイズする必要があります。
// このAPIでは一時的なパスワードをランダムに指定しています。
// このようなバッチの場合はバックエンドでパスワード変更のメールの送信設定をするなどの対応が必要です。

