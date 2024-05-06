import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearch } from "../hooks/useSearch";

const SearchComponent = () => {
  const { query, setQuery, isLoading, results, handleSearch } = useSearch();

  return (
    <div className="flex flex-col justify-center space-y-4">
      <form onSubmit={handleSearch} className="flex items-center space-x-2 mt-2 mb-4">
        <Input
          className="p-2 border border-gray-300 rounded w-80"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term..."
        />
        <Button type="submit" disabled={isLoading}>
          Search
        </Button>
      </form>
      {isLoading && <div>Loading...</div>}
      {!isLoading && results.length === 0 && <div>There are no results matching your query.</div>}
      {!isLoading && results.map((result) => (
        <div
          className="mt-4 p-4 border rounded shadow w-full max-w-md cursor-pointer"
          key={result.id}
          onClick={() => window.open(result.url, '_blank')}
        >
          <h4 className="text-lg font-bold">{result.title}</h4>
          <p className="text-gray-600">{result.description}</p>
          <span className="text-sm font-semibold">{result.category}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchComponent;
