import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users } from '../types/users'; // User型は一人のユーザーを表すと仮定します。
import Link from 'next/link';


const MyPage = () => {
  const [userData, setUserData] = useState<Users | null>(null); // 初期値はnullに、ユーザーデータが最初は無いため。

  const [userId, setUserId] = useState<string | null>(null); // useStateを使ってuserIdを管理する


  // useEffectフックを使ってコンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    const fetchData = async () => {
      let userIdFromStorage = localStorage.getItem('userId'); // 実際のログイン中のユーザーIDを取得する
      setUserId(userIdFromStorage); // 取得したuserIdを状態に保存する
      console.log(userIdFromStorage);
      if (userIdFromStorage) { // userIdが取得できた場合のみAPIを呼び出す
        const response = await axios.get(`http://localhost:4000/users/get-user/${userIdFromStorage}`); // テンプレートリテラルを使ってIDを挿入
        console.log(`http://localhost:4000/users/get-user/${userIdFromStorage}`); 
        setUserData(response.data); // 取得したデータで状態を更新
      }
    };

    fetchData();
  }, []); // 空の依存配列を指定して、このフックがコンポーネントのマウント時にのみ実行されるようにする

  return (
    <>
      <h1>私のページへようこそ</h1>
      {/* ユーザーデータにアクセスする前に、データが取得されているか確認 */}
      {userData ? (
        <>
          <h2>{userData.firstName} {userData.lastName}</h2>
          <p>{userData.email}</p>
          {/* 必要に応じて他のフィールドを追加 */}
          <div>
          <Link legacyBehavior href={`/users/editUser/${userId}`}>
            <a><button>編集</button></a>
          </Link>
          </div>
        </>
      ) : (
        // ユーザーデータが取得されるまでの間に表示
        <p>読み込み中...</p>
      )}
    </>
  );
};

export default MyPage;
