import { Link } from "react-router-dom";

function AuthorCard({ author }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">

      <h2 className="text-2xl font-bold">
        {author.firstName} {author.lastName}
      </h2>

      <p className="text-gray-600 mt-2">
        {author.email}
      </p>

      <Link
        to={`/author/${author.id}`}
        className="inline-block mt-5 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
      >
        View Details
      </Link>

    </div>
  );
}

export default AuthorCard;