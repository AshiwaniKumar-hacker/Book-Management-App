import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function AuthorDetails() {

  const { id } = useParams();

  const [author, setAuthor] = useState(null);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchAuthor();
    fetchBooks();
  }, []);

  const fetchAuthor = async () => {
    try {

      const res = await api.get(`/authors/${id}`);

      setAuthor(res.data.author);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchBooks = async () => {
    try {

      const res = await api.get(`/authors/${id}/books`);

      setBooks(res.data.books);

    } catch (err) {
      console.log(err);
    }
  };

  if (!author) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold">

          {author.firstName} {author.lastName}

        </h1>

        <p className="text-gray-600 mt-3">
          {author.email}
        </p>

      </div>

      <h2 className="text-3xl font-bold mt-10 mb-5">
        Books
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {books.length > 0 ? (

          books.map((book) => (

            <div
              key={book.id}
              className="bg-white rounded-lg shadow p-5"
            >

              <h3 className="text-xl font-bold">

                {book.title}

              </h3>

              <p className="text-gray-600 mt-3">

                {book.description}

              </p>

            </div>

          ))

        ) : (

          <h2>No Books Found</h2>

        )}

      </div>

      <Link
        to="/authors"
        className="inline-block mt-8 bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Back
      </Link>

    </div>
  );
}

export default AuthorDetails;