import React, { useEffect, useState } from "react";
import { useFetchPosts } from "../utils/useFetchPosts";
import PostCard from "./PostCard";
import Loading from "./Loading";

const PostList = () => {
  const [page, setPage] = useState(1);
  const [posts, loading, error, hasMore] = useFetchPosts(
    `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`,
    page
  );

  const handleInfiniteScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;

    if (scrollHeight <= scrollTop + innerHeight + 5 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [page, hasMore]);

  //   if (loading) {
  //     return <div>bhai load ho rha h thoda sa wait krle bss thoda saaaa...</div>;
  //   }

  if (error) {
    return (
      <div>
        <div>
          <p>
            thora si dikkat aa gyi data fetch karne m, bhyii aap refresh kar lo
            ek bar
          </p>
          <h1 className="text-xl font-bold">{error}</h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => {
          return <PostCard key={index} post={post} />;
        })}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default PostList;
