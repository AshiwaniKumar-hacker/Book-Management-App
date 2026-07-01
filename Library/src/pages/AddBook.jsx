import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddBook() {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authorId: "",
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await api.get("/authors");

      // If your backend returns { authors: [...] }
      setAuthors(res.data.authors);

      // If it returns just an array, use:
      // setAuthors(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/books", formData);

      alert("Book Added Successfully!");

      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">

      <h1 className="text-3xl font-bold mb-6">
        Add New Book
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Book Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          rows="5"
          required
        />

        <select
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">
            Select Author
          </option>

          {authors.map((author) => (
            <option
              key={author.id}
              value={author.id}
            >
              {author.firstName} {author.lastName}
            </option>
          ))}

        </select>

        <button
          className="bg-blue-700 text-white w-full py-3 rounded-lg hover:bg-blue-800"
        >
          Add Book
        </button>

      </form>

    </div>
  );
}

export default AddBook;