import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import Authors from "./pages/Authors";
import AddAuthor from "./pages/AddAuthor";
import BookDetails from "./pages/BookDetails";
import AuthorDetails from "./pages/AuthorDetails";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/add-author" element={<AddAuthor />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/author/:id" element={<AuthorDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;