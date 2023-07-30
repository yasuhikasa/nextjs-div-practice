import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { createUser } from '../api/register';


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

const UserImport: React.FC = () => {
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


  const handleCreateUsers = async () => {
    setIsDialogOpen(false);

    for (let user of users) {
      try {
        await createUser(user);
        console.log('User created', user.email);
      } catch (error) {
        console.error('Error creating user', error);
      }
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
