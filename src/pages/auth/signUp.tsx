import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Auth } from '@aws-amplify/auth';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';


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
  password: string;
}

const SignUp: React.FC = () => {
  const [signUpError, setSignUpError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUpFormInputs>();

  const onSubmit = async (data: ISignUpFormInputs) => {
    try {
      const { user } = await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email
        }
      });
      console.log(user);
    } catch (error) {
      console.error('Error signing up:', error);
      if (error instanceof Error) {
        // If error is an instance of Error, we can access its message property
        setSignUpError(error.message || 'An error occurred during sign up');
      } else {
        // If it's not, just display a generic error message
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
        {...register("password", { required: true, minLength: 8 })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>Password is required (min. 8 characters)</p>}
      <button type="submit">Sign Up</button>
      {signUpError && <p>{signUpError}</p>}
    </form>
  );
};

export default SignUp;




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

