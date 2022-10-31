import Link from "next/link";
import { useRouter } from "next/router";

const ExploreNavigation = () => {
  const router = useRouter();

  return (
    <div className="header flex items-center justify-center border-b border-light-border_primary dark:border-dark-border_primary">
      <ul className="flex gap-2">
        <li
          className={`btn-tab px-3  ${
            router.route === "/explore" ? "border-b-2 border-blue" : ""
          }`}
        >
          <Link href="/explore">Trending</Link>
        </li>
        <li
          className={`btn-tab px-3 ${
            router.route.includes("/tags") ? "border-b-2 border-blue" : ""
          } `}
        >
          <Link href="/explore/tags">Tags</Link>
        </li>
        <li
          className={`btn-tab px-3 ${
            router.route.includes("/blogs") ? "border-b-2 border-blue" : ""
          } `}
        >
          <Link href="/explore/blogs">Blogs</Link>
        </li>
        <li
          className={`btn-tab px-3 ${
            router.route.includes("/following-tags")
              ? "border-b-2 border-blue"
              : ""
          } `}
        >
          <Link href="/explore/following-tags">Tags You Follow</Link>
        </li>
        <li
          className={`btn-tab px-3 ${
            router.route.includes("/following-blogs")
              ? "border-b-2 border-blue"
              : ""
          } `}
        >
          <Link href="/explore/following-blogs">Blogs You Follow</Link>
        </li>
      </ul>
    </div>
  );
};

export default ExploreNavigation;
