import Link from "next/link";
import { readingTime } from "utils/helpers/miniFunctions";
import BookmarkLoading from "./loadings/BookmarkLoading";

const Bookmark = ({ data, loading }) => {
  return (
    <div className="card mb-20 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-2 text-black dark:text-dark-heading_color font-semibold">
          Bookmarks
        </h1>
        <Link href="/bookmarks">
          <button className="btn-secondary text-sm text-light-paragraph_color font-semibold dark:text-dark-paragraph_color">
            See all
          </button>
        </Link>
      </div>

      {loading ? (
        <>
          <BookmarkLoading />
          <BookmarkLoading />
          <BookmarkLoading />
          <BookmarkLoading />
          <BookmarkLoading />
        </>
      ) : (
        data?.map((bookmark) => (
          <div className="last:mb-0 last:border-none py-2 bg-white dark:bg-dark-primary_background border-b border-light-border_primary dark:border-dark-border_primary">
            <h1 className="text-md font-semibold text-black dark:text-dark-heading_color">
              {bookmark.title}
            </h1>
            <p className="text-md gap-2 text-light-paragraph_color dark:text-dark-paragraph_color">
              {bookmark.user.name} · {readingTime(bookmark.content)} min read
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmark;
