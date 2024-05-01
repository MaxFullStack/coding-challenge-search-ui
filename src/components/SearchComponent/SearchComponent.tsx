import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  category: 'VIDEOS' | 'PLAYLISTS' | 'BLOG_POSTS';
}

const SearchComponent = () => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    setNoResults(false);
    try {
      const response = await fetch(`/api/data?search=${encodeURIComponent(query)}`);
      const data: SearchResult[] = await response.json();
      setResults(data.length > 0 ? data : []);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
      setNoResults(true);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="flex items-center space-x-2 mb-4 mt-2">
        <Input
          className="p-2 border border-gray-300 rounded w-1/3" 
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter search term..."
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading}
        >
          Search
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {noResults && <div>There are no results matching your query.</div>}
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
