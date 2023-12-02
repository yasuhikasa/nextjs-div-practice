import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import { Users } from '../types/users';
import { searchUsers } from '../api/searchUsers';
import TableComponent from '../components/table/table';
import { NextPage } from 'next';

const SearchUsers: NextPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState<Users[]>([]); // Add this line

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    const searchParams: Partial<Users> = {
      lastName: searchValue,
      firstName: searchValue,
      lastNameKana: searchValue,
      firstNameKana: searchValue,
    };

    const results = await searchUsers(searchParams);
    console.log(results);
    setUsers(results);
  };

  return (
    <Layout>
      <div>
        <h1>検索</h1>
        <div>
          <form onSubmit={handleSearch}>
            <input type="text" placeholder="検索" onChange={inputChange} />
            <button type="submit">検索</button>
          </form>
        </div>
      </div>
      <div>
        <h1>検索結果</h1>
        {/* Map through the users array to display the search results */}
        <TableComponent users={users} />
      </div>
    </Layout>
  );
}

export default SearchUsers;
