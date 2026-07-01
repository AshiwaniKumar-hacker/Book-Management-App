import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (search = "") => {
    try {
      setLoading(true);

      let url = "/books";

      if (search.trim() !== "") {
        url = `/books?search=${search}`;
      }

      const res = await api.get(url);

      // If backend returns { books: [...] }
      if (res.data.books) {
        setBooks(res.data.books);
      } else {
        // If backend returns only an array
        setBooks(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/books/${id}`);

      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete book.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Books
        </h1>
      </div>

      <SearchBar onSearch={fetchBooks} />

      {books.length === 0 ? (
        <div className="text-center mt-12 text-gray-500 text-xl">
          No Books Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;