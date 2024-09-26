import axios from "axios";
import { useState, useEffect } from "react";

export const useFetchPosts = (url, page) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      const data = res.data;
      setLoading(false);
      setError(null);
      setPosts((prevData) => [...prevData, ...data]);
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (hasMore) {
      getPosts();
    }
  }, [page]);

  return [posts, loading, error, hasMore];
};
