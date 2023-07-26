import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import { getUsers, getTotalUsers } from '../api/user';
import styles from '../../styles/components/usersIndex.module.css';
import { Users } from '../types/users';
import Pagination from '../components/pagination/pagination';
import { useRouter } from 'next/router';
import Button from '../components/button/button';



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

  //現在のURLのクエリパラメータを表すオブジェクトを返す
  const router = useRouter();

  // バックエンドからusersデータと全ユーザー数を取得する処理
  const [users, setUsers] = React.useState<Users[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  // この新しい状態を作成して、各ユーザーが選択されているかどうかを管理します。
  const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({});

  // すべてのユーザーが選択されているかどうかを確認します。
  const allUsersSelected = users.every(user => (user.id ? selectedUsers[user.id.toString()] : false));

  // 各ユーザーの選択状態を切り替えるハンドラー
  const toggleUserSelection = (id: string) => {
    setSelectedUsers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // すべてのユーザーの選択状態を切り替えるハンドラー
  const toggleAllUsersSelection = () => {
    if (allUsersSelected) {
      setSelectedUsers({});
    } else {
      setSelectedUsers(users.reduce((obj, user) => (user.id ? { ...obj, [user.id.toString()]: true } : obj), {}));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(page);
        setUsers(response);
      } catch (error) {
        console.error('Error getting users:', error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const totalUsers = await getTotalUsers();
        setTotalPages(Math.ceil(totalUsers / 10));
      } catch (error) {
        console.error('Error getting total users:', error);
      }
    };

    fetchUsers();
    fetchTotalUsers();
  }, [page]);

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
          <div>
          <input type="checkbox" onChange={toggleAllUsersSelection} checked={allUsersSelected} />
            名前</div>
          <div>メールアドレス</div>
          <div>電話番号</div>
          <div>性別</div>
          <div>生年月日</div>
          <div>職業</div>
        </div>
        {users.map((user,index) => (
          <div key={index} className={styles.usersItem}>
            <input type="checkbox" onChange={() => user.id && toggleUserSelection(user.id.toString())} checked={selectedUsers[user.id ? user.id.toString() : ''] || false} />
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{genderLabels[user.gender]}</div>
            <div>{formatDate(user.dateOfBirth)}</div>
            <div>{jobOptionsMap[user.job]}</div>
            <Button
              title="Edit"
              buttonType="button"
              onClick={() => router.push(`/users/editUser/${user.id}`)}
            />
          </div>
        ))}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Layout>
  );
}

export default Index;
