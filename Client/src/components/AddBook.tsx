import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation ,getBooksQuery  } from '../queries';


function AddBooks() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [AddBook] = useMutation(addBookMutation);

  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: 'Select author', 
  });

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading authors</option>;
    } else if (error) {
      return <option>Error loading authors</option>;
    } else {
      return data.authors.map((author : { id: string; name: string }) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formData.authorId !== 'Select author') {
      AddBook({
        variables: {
          name: formData.name,
          genre: formData.genre,
          authorId: formData.authorId,
        },
      });

      
     
  
      setFormData({
        name: '',
        genre: '',
        authorId: 'Select author',
      });
    } else {
      alert('Please select an author');
    }
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          name="authorId"
          value={formData.authorId}
          onChange={handleInputChange}
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}

export default AddBooks;
