import { useLazyQuery } from "@apollo/client";
import { getTrendingBlogs, GET_BOOKMARKS } from "utils/helpers/gql/query";
import useBookmark from "utils/hooks/useBookmark";
import { useEffect } from "react";
import Bookmark from "./Bookmark";
import { readingTime } from "utils/helpers/miniFunctions";
import Image from "next/image";

const RightMenu = () => {
  const { allBookmarks } = useBookmark();
  const [getBookmarkData, { data, loading }] = useLazyQuery(GET_BOOKMARKS);
  const [getTrendingPosts, { data: trendingPosts, loading: trendingLoading }] =
    useLazyQuery(getTrendingBlogs);

  console.log({ trendingPosts, trendingLoading });

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
            <div className="last:mb-0 last:border-none py-2 bg-white dark:bg-dark-primary_background border-b border-light-border_primary dark:border-dark-border_primary flex gap-4">
              <div className="w-[40px]">
                <Image
                  src={card.user.profile_photo.url}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-md font-semibold text-black dark:text-dark-heading_color">
                  {card.title}
                </h1>
                <p className="text-md gap-2 text-light-paragraph_color dark:text-dark-paragraph_color">
                  {card.user.name} · {readingTime(card.content)} min read
                </p>
              </div>
            </div>
          ))}
        </main>
      </div>

      <Bookmark data={data?.getManyPosts} loading={loading} />
    </div>
  );
};

export default RightMenu;
