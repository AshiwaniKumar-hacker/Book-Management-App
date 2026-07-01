import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">
          📚 Library Management
        </h1>

        <div className="flex gap-6 font-semibold">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300"
                : "hover:text-yellow-300 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/authors"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300"
                : "hover:text-yellow-300 transition"
            }
          >
            Authors
          </NavLink>

          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300"
                : "hover:text-yellow-300 transition"
            }
          >
            Add Book
          </NavLink>

          <NavLink
            to="/add-author"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300"
                : "hover:text-yellow-300 transition"
            }
          >
            Add Author
          </NavLink>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;