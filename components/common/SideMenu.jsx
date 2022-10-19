import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

import TrendingCard from "components/common/TrendingCard";
import Book from "public/icons/book";
import Explore from "public/icons/explore";
import Feed from "public/icons/feed";
import Improvement from "public/icons/improvement";
import { SECONDARY_ICON_SIZE } from "utils/constant";
import { getTrendingTags } from "utils/helpers/gql/query";

const SideMenu = () => {
  const { data, loading, error } = useQuery(getTrendingTags);
  const name = useRouter().asPath;

  const menus = [
    {
      _id: uuidv4(),
      title: "My Feed",
      link: "/",
      icon: (
        <Feed
          className="text-primary-dark-300 dark:tezt-white"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
    {
      _id: uuidv4(),
      title: "Explore",
      link: "/explore",
      icon: (
        <Explore
          className="text-primary-dark-300 dark:tezt-white"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
    {
      _id: uuidv4(),
      title: "Drafts",
      link: "/draft",
      icon: (
        <Book
          className="text-primary-dark-300 dark:tezt-white"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
  ];

  return (
    <aside className="card h-fit sticky top-[1.25rem] left-0">
      <div className="pb-spacing border-b dark:border-dark-border_secondary py-2">
        {menus.map((menu) => {
          return (
            <Link href={menu.link}>
              <div
                key={uuidv4()}
                className={`flex gap-2 items-center py-3 px-4 text-md font-medium cursor-pointer hover:bg-dark-border_secondary ${
                  name === menu.link
                    ? "border-r-2 border-blue text-blue fill-blue"
                    : "text-black dark:text-white"
                }`}
              >
                {menu.icon}
                {menu.title}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="py-spacing px-4">
        <h1 className="tracking-wide text-md text-black dark:text-dark-paragraph_color flex gap-2 items-center font-semibold mb-3">
          Trending Tags
          <Improvement
            className="fill-primary-dark-300 dark:fill-dark-paragraph_color"
            w={SECONDARY_ICON_SIZE}
            h={SECONDARY_ICON_SIZE}
          />
        </h1>

        <ul>
          {loading
            ? "Loading..."
            : data?.getTrendingTags.map((tag) => (
                <TrendingCard key={uuidv4()} tag={tag} />
              ))}
        </ul>
      </div>

      <footer className="py-spacing px-4">
        <span className="w-16 h-[1.85px] bg-light-border_primary dark:bg-dark-border_secondary block mb-2"></span>
        <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-md">
          @{new Date().getFullYear()} Hashnode
        </p>
      </footer>
    </aside>
  );
};

export default SideMenu;
