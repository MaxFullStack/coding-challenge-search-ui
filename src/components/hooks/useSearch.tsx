import { useState } from "react";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "VIDEOS" | "PLAYLISTS" | "BLOG_POSTS";
}

const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `/api/data?search=${encodeURIComponent(query)}`
      );
      const data: SearchResult[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { query, setQuery, isLoading, results, handleSearch };
};

export { useSearch };
