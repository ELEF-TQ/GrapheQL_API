import { gql, useQuery } from "@apollo/client";
import React from "react";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const Book: React.FC = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul id="Book__List">
      {data.books.map((book: { id: number; name: string }) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default Book;
