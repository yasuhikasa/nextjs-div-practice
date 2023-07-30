import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';
import axios from 'axios';


// getServerSidePropsがSSR（サーバサイドレンダリング）を実行し、
// 既にログインしているユーザーがこのサインアップページを訪れた場合、ホームページにリダイレクト

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


//サインアップ機能の実装

interface ISignUpFormInputs {
  email: string;
  firstName: string;
  lastName: string;
}

const SignUp: React.FC = () => {
  const [signUpError, setSignUpError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUpFormInputs>();

  // バックエンドでcognitoと連携し、DBにユーザー情報を保存する場合は下でコメントアウトしているonSubmitではなく
  // 普通のREST APIを作成して、そのAPIを呼び出すようにする。
  // ここではバックエンドでの処理を前提としているので、axiosを使ってバックエンドのAPIを呼び出している。
  const onSubmit = async (data: ISignUpFormInputs) => {
    try {
      const response = await axios.post('/api/signup', data);
      const user = response.data;
      console.log(user);
    } catch (error) {
      console.error('Error signing up:', error);
      if (error instanceof Error) {
          setSignUpError(error.message || 'An error occurred during sign up');
      } else {
          setSignUpError('An error occurred during sign up');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <p>Email is required</p>}
      <input
        {...register("firstName", { required: true })}
        type="text"
        placeholder="First Name"
      />
      {errors.firstName && <p>First Name is required</p>}
      <input
        {...register("lastName", { required: true })}
        type="text"
        placeholder="Last Name"
      />
      {errors.lastName && <p>Last Name is required</p>}
      <button type="submit">Sign Up</button>
      {signUpError && <p>{signUpError}</p>}
    </form>
  );
};

export default SignUp;



// const onSubmit = async (data: ISignUpFormInputs) => {
//   try {
//     const { user } = await Auth.signUp({
//       username: data.email,
//       password: '', // No password is provided, AWS Cognito will generate a temporary one
//       attributes: {
//         email: data.email,
//         given_name: data.firstName,
//         family_name: data.lastName,
//       }
//     });
//     console.log(user);
//   } catch (error) {
//     console.error('Error signing up:', error);
//     if (error instanceof Error) {
//       setSignUpError(error.message || 'An error occurred during sign up');
//     } else {
//       setSignUpError('An error occurred during sign up');
//     }
//   }
// };




// import React, { useState } from 'react';
// import { Auth } from '@aws-amplify/auth';

// const SignUp: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const { user } = await Auth.signUp({
//         username: email,
//         password,
//         attributes: {
//           email
//         }
//       });
//       console.log(user);
//     } catch (error) {
//       console.error('Error signing up:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUp;

