import Image from "next/image";
import Correct from "public/icons/Correct";
import WebLink from "public/icons/editor-icons/WebLink";
import Feed from "public/icons/feed";
import Pen from "public/icons/pen";
import People from "public/icons/People";
import Twitter from "public/icons/twitter";
import { DEFAULT_BUTTON_ICON_SIZE, DEFAULT_ICON_SIZE } from "utils/constant";

const ExploreTagIntro = ({ details }) => {
  return (
    <>
      <div className="card py-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Image
            src={details?.logo?.url}
            width={50}
            height={50}
            className="rounded-md"
          ></Image>
          <div>
            <h1 className="text-3xl font-semibold text-center text-black dark:text-dark-heading_color">
              {details?.name}
            </h1>
            <p className="text-light-paragraph_color dark:text-dark-paragraph_color">
              #{details?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-6">
          <button className="btn-tertiary rounded-full">
            <span>
              <Correct
                w={DEFAULT_ICON_SIZE}
                h={DEFAULT_ICON_SIZE}
                className="fill-blue"
              />
            </span>
            Following
          </button>
          <button className="btn-primary text-sm tracking-normal rounded-full">
            <span>
              <Pen w={DEFAULT_BUTTON_ICON_SIZE} h={DEFAULT_BUTTON_ICON_SIZE} />
            </span>
            Write an article
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 font-medium">
          <span className="text-black dark:text-dark-heading_color flex items-center gap-2">
            <People
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
            <span>144.9K Followers</span>
          </span>
          <span>·</span>
          <span className="text-black dark:text-dark-heading_color flex items-center gap-2">
            <Feed
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
            <span>34.6K Articles</span>
          </span>
          <div className="flex items-center gap-6">
            <Twitter
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
            <WebLink
              w={DEFAULT_ICON_SIZE}
              h={DEFAULT_ICON_SIZE}
              className="fill-black dark:fill-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreTagIntro;
