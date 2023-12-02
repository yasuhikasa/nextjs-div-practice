import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Users } from '../../types/users';
import { NextPage } from 'next';

const SimpleLogin:NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Users>();


  // ローカルストレージはブラウザにデータを永続的に保存するためのもので、
  // 主にクライアントサイドでの利用が想定されています。
  // たとえば、ユーザーのログイン情報やアプリの状態を保存するのに使われます。

  const onSubmit = async (data: Users) => {
    const response = await axios.post('http://localhost:4000/simpleLogin/simpleLogin', { email: data.email, password: data.user_password });
    if (response.data.status === 'success') {
      console.log(response);

      // ログインのレスポンスからユーザーIDを取得
      let userId = response.data.user.id;

      // ユーザーIDをローカルストレージに保存
      localStorage.setItem('userId', userId);
      // バックエンドからレスポンスを受け取り、ログイン成功したら、ユーザー情報を保存する。
      window.location.href = `/mypage/${response.data.user.id}`;
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
