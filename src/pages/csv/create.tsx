import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { NextPage } from 'next';


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

const UserImport: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];

      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setUsers(results.data as User[]);
        }
      });
    }
  }, []);


  // バックエンドでcognitoと連携し、DBにユーザー情報を保存する場合は
  // 普通のREST APIを作成して、そのAPIを呼び出すようにする。
  // ここではバックエンドでの処理を前提としているので、axiosを使ってバックエンドのAPIを呼び出している。

  const handleCreateUsers = async () => {
    setIsDialogOpen(false);

    try {
      const response = await axios.post('/api/signup', users);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error('Error signing up:', error);
    }

    setUsers([]);
};

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phone}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={openDialog}>Create Users</button>
      {isDialogOpen && (
        <div>
          <div>Are you sure you want to create these users?</div>
          <button onClick={closeDialog}>Cancel</button>
          <button onClick={handleCreateUsers}>OK</button>
        </div>
      )}
    </div>
  );
};

export default UserImport;
