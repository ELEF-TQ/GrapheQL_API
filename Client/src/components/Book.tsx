import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries";

const Book = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul id="Book__List">
      {data.books.map((book: { id: string; name: string }) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default Book;
