import styles from '../../../styles/components/table.module.css';
import { Users } from '../../types/users';

// テーブルのコンポーネント
const TableComponent =({ users }: { users: Users[] }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>名前</th>
          <th>メールアドレス</th>
          <th>電話番号</th>
          {/* 他のヘッダー */}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            {/* 他のデータ */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;