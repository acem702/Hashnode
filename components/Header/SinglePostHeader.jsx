import Image from "next/image";
import Link from "next/link";
import Moon from "public/icons/moon";
import Plus from "public/icons/plus";
import Search from "public/icons/search";
import { SECONDARY_ICON_SIZE, DEFAULT_PROFILE_SIZE } from "utils/constant";
import Logo from "public/icons/logo";

const SinglePostHeader = ({ details, user }) => {
  return (
    <header className="w-full bg-white dark:bg-dark-primary_background border-b border-light-border_primary dark:border-dark-border_primary">
      <div className="2xl:container w-full mx-auto px-4 py-6 flex gap-spacing items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={details.profile_photo.url}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <h1 className="text-lg font-semibold text-black dark:text-white">
            {details.name}
          </h1>
        </div>

        <Link href="/">
          <div className="cursor-pointer">
            <Logo
              w={DEFAULT_PROFILE_SIZE}
              h={DEFAULT_PROFILE_SIZE}
              className="fill-blue"
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button className="btn-icon hidden md:block">
            <Search
              w={SECONDARY_ICON_SIZE}
              h={SECONDARY_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
          </button>
          <button className="btn-icon">
            <Moon
              w={SECONDARY_ICON_SIZE}
              h={SECONDARY_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
          </button>
          <button className="btn-primary rounded-md text-md flex itmes-center gap-2">
            <Plus
              w={SECONDARY_ICON_SIZE}
              h={SECONDARY_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
            <span>Follow</span>
          </button>
          <Image
            src={user.profile_photo.url}
            width={DEFAULT_PROFILE_SIZE}
            height={DEFAULT_PROFILE_SIZE}
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default SinglePostHeader;
