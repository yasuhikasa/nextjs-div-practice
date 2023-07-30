import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Auth } from '@aws-amplify/auth';

interface ISignInFormInputs {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [signInError, setSignInError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<ISignInFormInputs>();

  const onSubmit = async (data: ISignInFormInputs) => {
    try {
      const user = await Auth.signIn(data.email, data.password);
      console.log(user);
    } catch (error) {
      console.error('Error signing in:', error);
      if (error instanceof Error) {
        setSignInError(error.message || 'An error occurred during sign in');
      } else {
        setSignInError('An error occurred during sign in');
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
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>Password is required</p>}
      <button type="submit">Sign In</button>
      {signInError && <p>{signInError}</p>}
    </form>
  );
};

export default SignIn;



// import React, { useState } from 'react';
// import { Auth } from '@aws-amplify/auth';

// const SignIn: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const user = await Auth.signIn(email, password);
//       console.log(user);
//     } catch (error) {
//       console.error('Error signing in:', error);
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
//       <button type="submit">Sign In</button>
//     </form>
//   );
// };

// export default SignIn;