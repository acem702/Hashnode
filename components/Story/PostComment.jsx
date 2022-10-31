import CommentModel from "components/new/CommentModel";
import { v4 as uuidv4 } from "uuid";
import CommentCard from "./CommentCard";
import { useState } from "react";

const PostComment = ({ data }) => {
  const [details, setDetails] = useState(data);
  const [commentModelState, setCommentModelState] = useState(false);

  return (
    <div className="w-[60rem] mx-auto mt-8">
      <div className="card mb-spacing flex-row items-center justify-between py-6 px-4">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Comments ({details.commentsCount})
        </h1>
        <button
          className="btn-primary rounded-md"
          onClick={() => setCommentModelState((prev) => !prev)}
        >
          Write a comment
        </button>
      </div>

      {commentModelState && (
        <CommentModel
          details={details}
          setDetails={setDetails}
          setCommentModelState={setCommentModelState}
        />
      )}

      <div>
        {details.comments.map((comment) => (
          <CommentCard key={uuidv4()} details={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostComment;
