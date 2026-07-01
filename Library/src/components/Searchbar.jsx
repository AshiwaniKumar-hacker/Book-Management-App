import { useState } from "react";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex gap-3">

      <input
        type="text"
        placeholder="Search Books..."
        className="border p-3 rounded-lg flex-1 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={() => onSearch(search)}
        className="bg-blue-700 text-white px-6 rounded-lg"
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;