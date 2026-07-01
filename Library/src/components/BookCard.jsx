import { Link } from "react-router-dom";

function BookCard({ book, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">

      <h2 className="text-2xl font-bold">
        {book.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {book.description}
      </p>

      <div className="flex gap-3 mt-5">

        <Link
          to={`/book/${book.id}`}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          View
        </Link>

        <button
          onClick={() => onDelete(book.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default BookCard;