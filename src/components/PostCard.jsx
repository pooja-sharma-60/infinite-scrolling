import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">{post.body}</p>
      </div>
    </div>
  );
};

export default PostCard;
