import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (search = "") => {
    try {
      let url = "/books";

      if (search !== "") {
        url = `/books?search=${search}`;
      }

      const res = await api.get(url);

      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);

      fetchBooks();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Loading...
      </h1>
    );
  }

  return (
    <div>

      <SearchBar onSearch={fetchBooks} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={deleteBook}
            />
          ))
        ) : (
          <h2>No Books Found</h2>
        )}

      </div>

    </div>
  );
}

export default Home;