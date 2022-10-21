import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";

import RightMenu from "components/common/RightMenu";
import SideMenu from "components/common/SideMenu";
import ExploreIntro from "components/Explore/exploreIntro";
import Header from "components/Header";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import { getTrendingTags, GET_USER_STATUS } from "utils/helpers/gql/query";

const Explore = ({ user }) => {
  const { setUser } = useContext(Context);
  const { data, loading } = useQuery(getTrendingTags);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <>
      <Head>
        <title>Explore Tech Blogs & Tags on Hashnode</title>
      </Head>

      <div className="w-full bg-light-primary_background dark:bg-black">
        <Header />

        <div
          className={`w-full xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full`}
        >
          <div className={`side-menu hidden lg:block`}>
            <SideMenu />
          </div>

          <div className="posts-body">
            <ExploreIntro />

            <div className="card">
              <div className="header pt-4 flex items-center justify-center border-b border-light-border_primary dark:border-dark-border_primary">
                <ul className="flex gap-2">
                  <li className="hover:bg-dark-border_secondary rounded-t-md px-2 pt-4 pb-2 font-semibold border-b-2 border-blue text-black dark:text-white">
                    Trending
                  </li>
                  <li className="hover:bg-dark-border_secondary rounded-t-md px-2 pt-4 pb-2 font-semibold text-black dark:text-white">
                    Tags
                  </li>
                  <li className="hover:bg-dark-border_secondary rounded-t-md px-2 pt-4 pb-2 font-semibold text-black dark:text-white">
                    Blogs
                  </li>
                  <li className="hover:bg-dark-border_secondary rounded-t-md px-2 pt-4 pb-2 font-semibold text-black dark:text-white">
                    Tags You Follow
                  </li>
                  <li className="hover:bg-dark-border_secondary rounded-t-md px-2 pt-4 pb-2 font-semibold text-black dark:text-white">
                    Blogs You Follow
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <header className="flex items-center gap-6 mb-6">
                  <h1 className="text-xl font-semibold text-black dark:text-dark-heading_color">
                    Trending Tags
                  </h1>
                  <button className="btn-tertiary rounded-full">
                    See all tags
                  </button>
                </header>

                <main className="flex flex-wrap gap-4">
                  {data?.getTrendingTags?.map((tag) => (
                    <div className="p-4 rounded-md bg-dark-border_primary w-full md:w-[calc(100%/2-8px)] border border-light-border_primary dark:border-dark-border_primary flex items-center gap-2">
                      <Image
                        src={tag.logo.url}
                        width={40}
                        height={40}
                        className="object-cover rounded-md"
                      ></Image>
                      <div>
                        <Link href={`/tags/${tag.name}`}>
                          <h1 className="text-lg font-semibold text-black dark:text-white cursor-pointer">
                            {tag.name}
                          </h1>
                        </Link>
                        <span className="text-sm">
                          {tag.articles} articles this week
                        </span>
                      </div>
                    </div>
                  ))}
                </main>
              </div>
            </div>
          </div>

          <div className={`right-menu hidden lg:inline`}>
            <RightMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;

export const getServerSideProps = async (ctx) => {
  try {
    let user = null;
    const token = ctx.req.cookies.token;

    if (token) {
      const {
        data: { getUser: data },
      } = await client.query({
        query: GET_USER_STATUS,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      user = data.user;
    }

    return {
      props: { user },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
