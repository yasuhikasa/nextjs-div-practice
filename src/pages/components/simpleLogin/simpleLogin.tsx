import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Users } from '../../types/users';

const SimpleLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Users>();


  const onSubmit = async (data: Users) => {
    const response = await axios.post('http://localhost:4000/simpleLogin/simpleLogin', { email: data.email, password: data.user_password });
    if (response.data.status === 'success') {
      // Login was successful, redirect to the user's home page
      // Replace '/home' with the path to your user's home page
      window.location.href = '/users/createUser';
    } else {
      // Login failed, show an error message
      console.log('Login failed:', response.data.message);
    }
  };

  return (
    <>
    <div>サインイン</div>
    <div>
    <form onSubmit={handleSubmit(data => onSubmit(data))}>
  <input
    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
    type="email"
    placeholder="Email"
  />

  <input
    {...register("user_password", { required: true })}
    type="password"
    placeholder="Password"
  />

  <button type="submit">Log In</button>
</form>
    </div>
    </>
  );
};

export default SimpleLogin;
