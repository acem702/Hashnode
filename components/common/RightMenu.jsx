import { useLazyQuery } from "@apollo/client";
import { getTrendingBlogs, GET_BOOKMARKS } from "utils/helpers/gql/query";
import useBookmark from "utils/hooks/useBookmark";
import { useEffect } from "react";
import Bookmark from "./Bookmark";
import { readingTime } from "utils/helpers/miniFunctions";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import TrendingPostCard from "./TrendingPostCard";

const RightMenu = () => {
  const { allBookmarks } = useBookmark();
  const [getBookmarkData, { data, loading }] = useLazyQuery(GET_BOOKMARKS);
  const [getTrendingPosts, { data: trendingPosts, loading: trendingLoading }] =
    useLazyQuery(getTrendingBlogs);

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

  useEffect(() => {
    (async () => {
      await getTrendingPosts({
        variables: {
          input: {
            limit: 4,
            skip: 0,
          },
        },
      });
    })();
  }, []);

  return (
    <div className="w-full flex flex-col gap-spacing h-full">
      <div className="card p-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black dark:text-dark-heading_color">
            Trending
          </h1>
          <button className="btn-secondary text-light-paragraph_color font-semibold dark:text-dark-paragraph_color">
            See all
          </button>
        </header>

        <main>
          {trendingPosts?.getTrendingBlogs.map((card) => (
            <TrendingPostCard card={card} key={uuidv4()} />
          ))}
        </main>
      </div>

      <Bookmark data={data?.getManyPosts} loading={loading} />
    </div>
  );
};

export default RightMenu;
