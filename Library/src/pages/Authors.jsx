import { useEffect, useState } from "react";
import api from "../services/api";
import AuthorCard from "../components/AuthorCard";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await api.get("/authors");

      // If backend returns {authors: [...]}
      setAuthors(res.data.authors);

      // If backend returns only an array use:
      // setAuthors(res.data);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
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

      <h1 className="text-4xl font-bold mb-8">
        Authors
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {authors.length > 0 ? (
          authors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
            />
          ))
        ) : (
          <h2>No Authors Found</h2>
        )}

      </div>

    </div>
  );
}

export default Authors;