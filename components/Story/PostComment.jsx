import React from "react";
import CommentCard from "./CommentCard";

const PostComment = ({ data }) => {
  return (
    <div className="py-10 max-w-[950px] mx-auto flex flex-col gap-spacing">
      <div className="card flex-row items-center justify-between py-6 px-4">
        <h1 className="text-2xl font-bold">Comments ({data.commentsCount})</h1>
        <button className="btn-primary rounded-md">Write a comment</button>
      </div>
      <div>
        {data.comments.map((comment) => (
          <CommentCard details={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostComment;
