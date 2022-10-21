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
import { GET_USER_STATUS, searchTagQuery } from "utils/helpers/gql/query";
import PageNotFound from "components/common/PageNotFound";

const SingleTag = ({ user, tag }) => {
  const { setUser } = useContext(Context);

  useEffect(() => {
    setUser(user);
  }, [user]);
  console.log(tag);

  return tag ? (
    <>
      <Head>
        <title>#{tag?.name} on Hashnode</title>
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
            <ExploreTagIntro details={tag} />
          </div>

          <div className={`right-menu hidden lg:inline`}>
            <TagRightMenu details={tag} />
          </div>
        </div>
      </div>
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
