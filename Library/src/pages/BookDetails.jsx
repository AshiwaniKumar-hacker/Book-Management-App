import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await api.get(`/books/${id}`);

      // Backend returns { message, book }
      setBook(res.data.book);

    } catch (err) {
      console.log(err);
    }
  };

  if (!book) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-4xl font-bold mb-5">
        {book.title}
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        {book.description}
      </p>

      <h3 className="text-xl">
        <span className="font-bold">Author : </span>

        {book.author?.firstName} {book.author?.lastName}
      </h3>

      <Link
        to="/"
        className="inline-block mt-8 bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Back
      </Link>

    </div>
  );
}

export default BookDetails;