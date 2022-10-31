import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Head from "next/head";

import SideMenu from "components/common/SideMenu";
import ExploreTagIntro from "components/Explore/exploreTagIntro";
import TagRightMenu from "components/Explore/TagRightMenu";
import Header from "components/Header";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import {
  getPostsByTag,
  GET_USER_STATUS,
  searchTagQuery,
} from "utils/helpers/gql/query";
import PageNotFound from "components/common/PageNotFound";
import Card from "components/common/Card";
import Clock from "public/icons/clock";
import Fire from "public/icons/fire";
import CardLoading from "components/common/loadings/cardLoading";
import SearchSection from "components/common/SearchSection";

const SingleTag = ({ user, tag }) => {
  const { setUser, searchState } = useContext(Context);
  const router = useRouter();
  const [getPosts, { data, loading }] = useLazyQuery(getPostsByTag);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    (async () => {
      await getPosts({
        variables: {
          tag: router.query.name,
        },
      });
    })();
  }, [router.query]);

  return tag ? (
    <>
      <Head>
        <title>#{tag?.name} on Hashnode</title>
      </Head>

      <Header />
      {searchState ? (
        <div className="w-full xl:container mx-auto min-h-[calc(100vh-76px)] h-full">
          <SearchSection />
        </div>
      ) : (
        <div className="w-full py-spacing bg-light-primary_background dark:bg-[#000]">
          <div className="w-full xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full">
            <div className="side-menu hidden lg:block">
              <SideMenu />
            </div>

            <div className="posts-body flex flex-col gap-spacing">
              <ExploreTagIntro details={tag} />

              <div className="card py-2">
                <div className="header flex items-center justify-between border-b border-light-border_primary dark:border-dark-border_primary">
                  <div className="px-3">
                    <div className="flex gap-3">
                      <span className="btn-tab">
                        <Fire
                          w={15}
                          h={15}
                          className="fill-black dark:fill-dark-heading_color"
                        />
                        Hot
                      </span>
                      <span className="btn-tab">
                        <Clock
                          w={15}
                          h={15}
                          className="fill-black dark:fill-dark-heading_color"
                        />
                        New
                      </span>
                    </div>
                  </div>
                </div>

                <main className="py-4">
                  {loading ? (
                    <>
                      <CardLoading />
                      <CardLoading />
                      <CardLoading />
                      <CardLoading />
                    </>
                  ) : data?.getPostsByTags.posts.length > 0 ? (
                    data?.getPostsByTags.posts.map((card) => (
                      <Card details={card} />
                    ))
                  ) : (
                    <div className="flex text-xl items-center flex-col px-4 py-8">
                      Nothing to Show
                    </div>
                  )}
                </main>
              </div>
            </div>

            <div className="right-menu hidden lg:inline">
              <TagRightMenu details={tag} />
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <PageNotFound />
  );
};

export default SingleTag;

export const getServerSideProps = async (ctx) => {
  try {
    let user = null;
    const token = ctx.req.cookies.token;
    const { name } = ctx.params;

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

    const {
      data: { searchTag: tagDetails },
    } = await client.query({
      query: searchTagQuery,
      variables: {
        tag: name,
      },
    });

    return {
      props: {
        user,
        tag: tagDetails,
      },
    };
  } catch (error) {
    return {
      props: {},
      tag: null,
    };
  }
};
