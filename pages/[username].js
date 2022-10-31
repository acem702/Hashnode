import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { format, isSameYear } from "date-fns";
import Header from "components/Header";
import SideMenu from "components/common/SideMenu";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import { getUserActivites, GET_USER } from "utils/helpers/gql/query";
import Pen from "public/icons/pen";
import { DEFAULT_BUTTON_ICON_SIZE } from "/utils/constant";
import PageNotFound from "/components/common/PageNotFound";
import Youtube from "/public/icons/socials/youtube";
import Facebook from "/public/icons/socials/facebook";
import Twitter from "/public/icons/socials/twitter";
import Stackoverflow from "/public/icons/socials/stackoverflow";
import Instagram from "/public/icons/socials/instagram";
import Github from "/public/icons/socials/github";
import Website from "/public/icons/socials/website";
import LinkedIn from "/public/icons/socials/linkedIn";
import { SECONDARY_ICON_SIZE } from "utils/constant";
import Head from "next/head";
import SearchSection from "components/common/SearchSection";

const Username = ({ user, data }) => {
  const { setUser, searchState } = useContext(Context);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (data.user) {
      setDate(format(+data.user.createdAt, "MMM, yyyy"));
    }
    setUser(user);
  }, [user, data]);

  const getSocial = () => {
    if (data.user && data.user.social) {
      const res = Object.entries(data.user.social).filter(
        (e) => e[1] !== null && e[1].trim() !== ""
      );
      return res.map((e) => ({ [e[0]]: e[1] }));
    } else {
      return [];
    }
  };

  return data.user ? (
    <>
      <Head>
        <title>@{data.user.username} - Hashnode</title>
      </Head>

      <Header />
      {searchState ? (
        <div className="w-full xl:container mx-auto min-h-[calc(100vh-76px)] h-full">
          <SearchSection />
        </div>
      ) : (
        <div className="w-full bg-light-primary_background dark:bg-[#000] py-spacing">
          <div className="w-full xl:container mx-auto px-2 flex flex-col lg:flex-row gap-spacing min-h-[calc(100vh-76px)] h-full">
            <div className="hidden lg:block flex-shrink-0 w-full lg:w-[14.5rem]">
              <SideMenu />
            </div>

            <div className="flex-1">
              <div className="card flex-row flex-wrap gap-xlspacing py-xlspacing px-10">
                <div className="flex items-start justify-between w-full">
                  <div className="flex gap-spacing">
                    <Image
                      className="rounded-full object-cover"
                      width={130}
                      height={130}
                      src={data.user.profile_photo?.url}
                    ></Image>
                    <div className="mt-4">
                      <h1 className="mb-2">
                        <span className="text-2xl font-semibold text-black dark:text-dark-heading_color">
                          {data.user.name}
                        </span>
                        <span className="ml-2 text-lg font-medium text-light-paragraph_color dark:text-dark-paragraph_color">
                          @{data.user.username}
                        </span>
                      </h1>
                      <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-lg">
                        {data.user.tagline.join(", ")}
                      </p>
                    </div>
                  </div>
                  {user._id === data.user._id && (
                    <button className="btn-primary rounded-full font-normal tracking-normal my-auto">
                      <span>
                        <Pen
                          w={DEFAULT_BUTTON_ICON_SIZE}
                          h={DEFAULT_BUTTON_ICON_SIZE}
                        />
                      </span>
                      <span>Edit</span>
                    </button>
                  )}
                </div>
                <div className="card mb-0 px-4 flex-row justify-center items-center gap-4 py-6 w-full">
                  {Object.values(user.social).filter((e) => e !== null) ? (
                    <div className="flex items-center gap-1">
                      {getSocial().map((e) => (
                        <a taregt="_blank" href={Object.values(e)}>
                          <button className="btn-icon">
                            {Object.keys(e)[0] === "youtube" ? (
                              <Youtube
                                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                                w={SECONDARY_ICON_SIZE}
                                h={SECONDARY_ICON_SIZE}
                              />
                            ) : Object.keys(e)[0] === "facebook" ? (
                              <Facebook
                                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                                w={SECONDARY_ICON_SIZE}
                                h={SECONDARY_ICON_SIZE}
                              />
                            ) : Object.keys(e)[0] === "twitter" ? (
                              <Twitter
                                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                                w={SECONDARY_ICON_SIZE}
                                h={SECONDARY_ICON_SIZE}
                              />
                            ) : Object.keys(e)[0] === "stackoverflow" ? (
                              <Stackoverflow
                                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                                w={SECONDARY_ICON_SIZE}
                                h={SECONDARY_ICON_SIZE}
                              />
                            ) : Object.keys(e)[0] === "instagram" ? (
                              <Instagram
                                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                                w={SECONDARY_ICON_SIZE}
                                h={SECONDARY_ICON_SIZE}
                              />
                            ) : Object.keys(e)[0] === "github" ? (
                              <Github
                                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                                w={SECONDARY_ICON_SIZE}
                                h={SECONDARY_ICON_SIZE}
                              />
                            ) : Object.keys(e)[0] === "website" ? (
                              <Website
                                className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                                w={SECONDARY_ICON_SIZE}
                                h={SECONDARY_ICON_SIZE}
                              />
                            ) : (
                              Object.keys(e)[0] === "linkedin" && (
                                <LinkedIn
                                  className="fill-light-paragraph_color dark:fill-dark-paragraph_color"
                                  w={SECONDARY_ICON_SIZE}
                                  h={SECONDARY_ICON_SIZE}
                                />
                              )
                            )}
                          </button>
                        </a>
                      ))}
                    </div>
                  ) : null}
                  <p className="text-md font-medium text-center text-black dark:text-white">
                    Member Since <span className="font-bold">{date}</span>
                  </p>
                </div>

                <div className="flex gap-spacing flex-wrap w-full">
                  <div className="w-full md:w-[calc(100%/2-0.8rem)] xl:w-[calc(100%/3-0.85rem)] card px-6 py-4">
                    <h1 className="mb-4 text-2xl font-semibold text-black dark:text-dark-heading_color">
                      About Me
                    </h1>
                    {data.user?.bio?.about ? (
                      <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
                        {data.user.bio.about}
                      </p>
                    ) : (
                      <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
                        Your bio is empty. Tell the world who you are by writing
                        a short description about you.
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-[calc(100%/2-0.8rem)] xl:w-[calc(100%/3-0.85rem)] card px-6 py-4">
                    <h1 className="mb-4 text-2xl font-semibold text-black dark:text-dark-heading_color">
                      My Tech Stack
                    </h1>
                    {data.user?.skills?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {data.user.skills.map((skill) => (
                          <button className="card mb-0 px-4 py-2 inline text-black dark:text-dark-heading_color">
                            {skill}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
                        Your tech stack is empty. Tell the world what is your
                        tech stack.
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-[calc(100%/2-0.8rem)] xl:w-[calc(100%/3-0.85rem)] card px-6 py-4">
                    <h1 className="mb-4 text-2xl font-semibold text-black dark:text-dark-heading_color">
                      I am available for
                    </h1>
                    {data.user?.bio?.about ? (
                      <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
                        {data.user?.bio?.available}
                      </p>
                    ) : (
                      <p className="text-md text-light-paragraph_color dark:text-dark-paragraph_color italic">
                        Nothing to show.
                      </p>
                    )}
                  </div>
                </div>

                <div className="card px-6 py-4 w-full">
                  <h1 className="text-2xl mb-8 font-semibold text-black dark:text-dark-heading_color">
                    Recent Activity
                  </h1>
                  <div className="flex flex-col">
                    {data.posts.map((post) => (
                      <div className="flex gap-6 w-full">
                        <div className="py-4 w-16 text-black dark:text-dark-heading_color font-semibold">
                          {format(
                            +post.createdAt,
                            isSameYear(new Date(+post.createdAt), new Date())
                              ? "MMM dd"
                              : "MMM dd yyyy"
                          )}
                        </div>
                        <div className="border-b border-light-border_primary w-full dark:border-dark-border_primary py-4">
                          <p className="text-md flex items-center gap-2 text-black dark:text-dark-heading_color font-medium">
                            <span>
                              <Pen
                                w={DEFAULT_BUTTON_ICON_SIZE}
                                h={DEFAULT_BUTTON_ICON_SIZE}
                                className="fill-black dark:fill-dark-heading_color"
                              />
                            </span>
                            <span>Wrote an article</span>
                          </p>
                          <h1 className="font-semibold text-xl text-black dark:text-dark-heading_color">
                            {post.title}
                          </h1>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-6 w-full">
                      <div className="py-4 w-16 text-black dark:text-dark-heading_color font-semibold">
                        {data &&
                          data.user &&
                          format(
                            +data.user.createdAt,
                            isSameYear(
                              new Date(+data.user.createdAt),
                              new Date()
                            )
                              ? "MMM dd"
                              : "MMM dd yyyy"
                          )}
                      </div>
                      <div className="py-4">
                        <p className="text-lg flex items-center gap-2">
                          <span className="font-medium text-lg text-light-paragraph_color dark:text-dark-paragraph_color">
                            Joined Hashnode
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <PageNotFound />
  );
};

export default Username;

export const getServerSideProps = async (ctx) => {
  try {
    let user = null;
    const token = ctx.req.cookies.token;
    const { username } = ctx.params;

    if (token) {
      const {
        data: { getUser: data },
      } = await client.query({
        query: GET_USER,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      user = data.user;
    }

    const {
      data: { getPostsByUser: posts_user_data },
    } = await client.query({
      query: getUserActivites,
      variables: {
        user: username.slice(1, username.length),
      },
    });

    return {
      props: {
        user,
        data: posts_user_data,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
        data: null,
      },
    };
  }
};
