import React, { useEffect } from 'react';
import Layout from '../components/layout/layout';
import { getUsers } from '../api/user';
import styles from '../../styles/components/usersIndex.module.css';
import { Users } from '../types/users';

const genderLabels: { [key: string]: string } = {
  male: '男性',
  female: '女性',
  '': ''
};

const jobOptionsMap: { [key: string]: string } = {
  '': '選択してください',
  'student': '学生',
  'engineer': 'エンジニア',
  'teacher': '教師',
  'artist': '芸術家'
  // ...
};

const Index:React.FC =()=> {

  //バックエンドからusersデータを取得する処理
  const [users, setUsers] = React.useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error getting users:', error);
      }
    }
    fetchUsers();
  }
  , []);

  //生年月日の日付のフォーマットを変更する処理
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // months start from 0 in JS
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  return (
    <Layout>
      <div>
        <h2>ユーザー一覧</h2>
        <div className={styles.usersTitle}>
          <div>名前</div>
          <div>メールアドレス</div>
          <div>電話番号</div>
          <div>性別</div>
          <div>生年月日</div>
          <div>職業</div>
        </div>
        {users.map((user,index) => (
          <div key={index} className={styles.usersItem}>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{genderLabels[user.gender]}</div>
            <div>{formatDate(user.dateOfBirth)}</div>
            <div>{jobOptionsMap[user.job]}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Index;
