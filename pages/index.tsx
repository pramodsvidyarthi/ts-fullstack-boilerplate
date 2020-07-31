import React from 'react';
import { useGetAllUsersQuery } from '../generated/hooks';

function Hello() {
  const [{ data, fetching, error }] = useGetAllUsersQuery();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {data.getAllUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default Hello;
