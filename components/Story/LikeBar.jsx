import React from "react";
import Like from "public/icons/emoji/thumbsup.webp";
import Heart from "public/icons/emoji/heart.webp";
import Clap from "public/icons/emoji/clap.webp";
import Money from "public/icons/emoji/money.webp";
import Trophy from "public/icons/emoji/trophy.webp";
import Love from "public/icons/emoji/love.webp";
import Unicorn from "public/icons/emoji/unicorn.webp";
import Beer from "public/icons/emoji/beer.webp";
import Comments from "public/icons/comments";
import Bookmark from "public/icons/bookmark";
import Twitter from "public/icons/twitter";
import Upload from "public/icons/upload";
import Image from "next/image";

const LikeBar = ({ likeData, user, likePost, commentsCount }) => {
  return (
    <div className="single-post-like-bar">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.entries(likeData.likes)
          .filter((e) => e[0] !== "total")
          .map((like) => {
            return (
              <div className="w-fit xl:w-[calc(100%/2-4px)]">
                <button
                  onClick={() => likePost(like[0])}
                  className={`mx-auto flex items-center gap-2 justify-center px-4 btn-icon ${
                    user && like[1].includes(user._id)
                      ? "border border-blue bg-dark-border_secondary"
                      : ""
                  }`}
                >
                  {like[0] === "thumbsup" ? (
                    <Image src={Like} width={30} height={30} />
                  ) : like[0] === "heart" ? (
                    <Image src={Heart} width={30} height={30} />
                  ) : like[0] === "unicorn" ? (
                    <Image src={Unicorn} width={30} height={30} />
                  ) : like[0] === "love" ? (
                    <Image src={Love} width={30} height={30} />
                  ) : like[0] === "cheers" ? (
                    <Image src={Beer} width={30} height={30} />
                  ) : like[0] === "money" ? (
                    <Image src={Money} width={30} height={30} />
                  ) : like[0] === "trophy" ? (
                    <Image src={Trophy} width={30} height={30} />
                  ) : (
                    <Image src={Clap} width={30} height={30} />
                  )}
                  <span className="font-extrabold">{like[1].length}</span>
                </button>
              </div>
            );
          })}
      </div>
      <div className="flex flex-row flex-wrap mt-6 md:mt-4 xl:flex-col w-full justify-center items-center gap-6">
        <button className="btn-icon flex items-center gap-2">
          <Comments w={25} h={25} className="fill-black dark:fill-white" />
          <span className="font-extrabold">{commentsCount}</span>
        </button>

        <button className="btn-icon">
          <Bookmark w={25} h={25} className="fill-black dark:fill-white" />
        </button>

        <button className="btn-icon">
          <Twitter w={25} h={25} className="fill-black dark:fill-white" />
        </button>

        <button className="btn-icon">
          <Upload w={25} h={25} className="fill-black dark:fill-white" />
        </button>
      </div>
    </div>
  );
};

export default LikeBar;
