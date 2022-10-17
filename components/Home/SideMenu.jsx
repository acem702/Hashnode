import { useQuery } from "@apollo/client";
import Book from "public/icons/book";
import Explore from "public/icons/explore";
import Feed from "public/icons/feed";
import Improvement from "public/icons/improvement";
import { SECONDARY_ICON_SIZE } from "utils/constant";
import { getTrendingTags } from "utils/helpers/gql/query";
import { v4 as uuidv4 } from "uuid";

const SideMenu = () => {
  const { data, loading, error } = useQuery(getTrendingTags);
  console.log(data);
  const menus = [
    {
      title: "My Feed",
      _id: uuidv4(),
      icon: (
        <Feed
          className="text-primary-dark-300 dark:text-primary-light-200"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
    {
      title: "Explore",
      _id: uuidv4(),
      icon: (
        <Explore
          className="text-primary-dark-300 dark:text-primary-light-200"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
    {
      title: "Drafts",
      _id: uuidv4(),
      icon: (
        <Book
          className="text-primary-dark-300 dark:text-primary-light-200"
          w={SECONDARY_ICON_SIZE}
          h={SECONDARY_ICON_SIZE}
        />
      ),
    },
  ];

  return (
    <aside className="bg-white dark:bg-primary-dark-200 border border-text-dark-200 dark:border-primary-dark-400 rounded-md h-fit px-4">
      <div className="pb-spacing border-b border-text-dark-200 dark:border-text-light-200">
        {menus.map((menu) => (
          <div className="flex gap-2 items-center py-3 text-md font-medium text-primary-dark-300 dark:text-primary-light-200">
            {menu.icon}
            {menu.title}
          </div>
        ))}
      </div>

      <div className="py-spacing">
        <h1 className="dark:text-text-dark-500 tracking-wide text-md text-black flex gap-2 items-center font-semibold mb-3">
          Trending Tags
          <Improvement
            className="fill-primary-dark-300 dark:fill-primary-light-200"
            w={SECONDARY_ICON_SIZE}
            h={SECONDARY_ICON_SIZE}
          />
        </h1>

        <ul>
          {loading
            ? "Loading..."
            : data.getTrendingTags.map((tag) => (
                <li className="flex hover:dark:bg-gray-700 hover:bg-gray-100 cursor-pointer items-center justify-between py-1 rounded-md px-2 text-md text-text-light-200 dark:text-text-dark-500 font-medium">
                  <span>
                    {tag.name.slice(0, 1).toUpperCase() +
                      tag.name.slice(1, tag.name.length)}
                  </span>
                  <span className="rounded-full bg-gray-100 dark:bg-gray-700 border border-text-dark-300 dark:border-text-dark-500 dark:text-text-dark-200 px-3 py-[3px] text-sm font-semibold">
                    +{tag.articles}
                  </span>
                </li>
              ))}
        </ul>
      </div>

      <footer className="py-spacing">
        <span className="w-16 h-[1.85px] bg-text-dark-200 dark:bg-text-light-200 block mb-2"></span>
        <p className="text-text-light-200 dark:text-text-dark-200 text-md">
          @2022 Hashnode
        </p>
      </footer>
    </aside>
  );
};

export default SideMenu;
