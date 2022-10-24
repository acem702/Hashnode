import { formatDistance } from "date-fns";
import Image from "next/image";
import MarkdownView from "react-showdown";

const CommentCard = ({ details }) => {
  return (
    <section className="card p-4 my-6">
      <header className="flex items-center justify-between w-full mb-4">
        <div className="flex gap-2 items-center">
          <Image
            src={details.user.profile_photo.url}
            className="rounded-full object-cover"
            width={60}
            height={60}
          />
          <div>
            <h1 className="text-xl font-semibold">{details.user.name}</h1>
            <p className="text-md">@{details.user.username}</p>
          </div>
        </div>
        <p className="text-md font-medium text-light-paragraph_color dark:text-dark-paragraph_color">
          {formatDistance(new Date(+details.createdAt), new Date(), {
            addSuffix: true,
          })}
        </p>
      </header>
      <main className="comment-card-markdown">
        <MarkdownView
          markdown={details.comment}
          options={{ tables: true, emoji: true }}
        />
      </main>
    </section>
  );
};

export default CommentCard;
