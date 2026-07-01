import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddAuthor() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("/authors", formData);

      alert("Author Added Successfully!");

      navigate("/authors");

    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">

      <h1 className="text-3xl font-bold mb-6">
        Add Author
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800"
        >
          Add Author
        </button>

      </form>

    </div>
  );
}

export default AddAuthor;