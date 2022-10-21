import { useLazyQuery } from "@apollo/client";
import { GET_BOOKMARKS } from "utils/helpers/gql/query";
import useBookmark from "utils/hooks/useBookmark";
import { useEffect } from "react";
import Bookmark from "./Bookmark";

const RightMenu = () => {
  const { allBookmarks } = useBookmark();
  const [getBookmarkData, { data }] = useLazyQuery(GET_BOOKMARKS);

  useEffect(() => {
    (async () => {
      if (allBookmarks.length > 0) {
        await getBookmarkData({
          variables: {
            ids: allBookmarks,
          },
        });
      }
    })();
  }, [allBookmarks]);

  return (
    <div className="w-full h-full">
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black dark:text-dark-heading_color">
            Trending
          </h1>
          <button className="btn-secondary text-light-paragraph_color font-semibold dark:text-dark-paragraph_color">
            See all
          </button>
        </div>
      </div>

      <Bookmark data={data?.getManyPosts} />
    </div>
  );
};

export default RightMenu;
