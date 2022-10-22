import { useEffect, useState } from "react";
import Image from "next/image";
import { getDate, reduceText } from "utils/helpers/miniFunctions";
import Link from "next/link";
import Bookmark from "public/icons/bookmark";
import { SECONDARY_ICON_SIZE } from "utils/constant";
import Like from "public/icons/like";
import Comment from "public/icons/comment";
import useBookmark from "utils/hooks/useBookmark";
import BookmarkAdded from "public/icons/bookmarkAdded";

const Card = ({ details }) => {
  const [content, setContent] = useState("");
  const { hasBookmark, changeBookmark } = useBookmark(details?._id);

  useEffect(() => {
    setContent(
      reduceText(
        details?.content,
        details?.cover_image && details?.cover_image.url ? 200 : 240
      )
    );
  }, []);

  const getTags = () => {
    if (details?.tags.length > 4) {
      return details?.tags.slice(0, 4);
    } else {
      return details?.tags;
    }
  };

  return (
    <div className="card px-4 border-0 rounded-none border-b">
      <header className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-700">
          <Link href={`/@${details?.user?.username}`}>
            <Image
              src={details?.user?.profile_photo?.url}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </Link>
        </div>
        <div>
          <Link href={`/@${details?.user?.username}`}>
            <h1 className="cursor-pointer text-black dark:text-dark-heading_color text-lg font-semibold">
              {details?.user.name}
            </h1>
          </Link>
          <p className="text-sm font-medium text-light-paragraph_color dark:text-dark-paragraph_color">
            <span>{getDate(details?.createdAt)}</span>
          </p>
        </div>
      </header>

      <main className="flex flex-col md:flex-row gap-4 justify-between py-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-black dark:text-dark-heading_color mb-4">
            {details?.title}
          </h1>
          <div className="dark:text-dark-paragraph_color text-light-paragraph_color">
            {content}
          </div>
        </div>

        {details?.cover_image?.url && (
          <div className="w-full md:max-w-[16rem] h-full bg-gray-700 rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={details?.cover_image.url}
              alt={details?.title}
            />
          </div>
        )}
      </main>

      <footer className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={changeBookmark}>
            {hasBookmark ? (
              <BookmarkAdded
                w={SECONDARY_ICON_SIZE}
                h={SECONDARY_ICON_SIZE}
                className="fill-blue"
              />
            ) : (
              <Bookmark
                w={SECONDARY_ICON_SIZE}
                h={SECONDARY_ICON_SIZE}
                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
              />
            )}
          </button>

          <div className="flex items-center gap-1">
            {getTags()?.map((tag) => (
              <Link href={`/tags/${tag}`}>
                <button className="rounded-md border border-light-border_primary dark:border-dark-border_primary hover:bg-light-border_primary dark:hover:bg-dark-border_primary text-light-paragraph_color dark:text-dark-paragraph_color text-sm px-2 py-1 ">
                  {tag}
                </button>
              </Link>
            ))}
            {details?.tags.length > 4 && (
              <button className="rounded-md border border-light-border_primary dark:border-dark-border_primary hover:bg-light-border_primary dark:hover:bg-dark-border_primary text-light-paragraph_color dark:text-dark-paragraph_color text-sm px-2 py-1 ">
                +{details?.tags.slice(4, details?.tags.length).length}
              </button>
            )}
          </div>
        </div>

        <div className="flex itmes-center gap-4">
          <button className="flex items-center gap-1">
            <span>
              <Like
                w={SECONDARY_ICON_SIZE}
                h={SECONDARY_ICON_SIZE}
                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
              />
            </span>
            <span>{details?.likes.total}</span>
          </button>

          <button className="flex items-center gap-1">
            <span>
              <Comment
                w={SECONDARY_ICON_SIZE}
                h={SECONDARY_ICON_SIZE}
                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
              />
            </span>
            <span>{details?.commentsCount}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Card;
