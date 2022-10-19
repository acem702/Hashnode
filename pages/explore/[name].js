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

const SingleTag = ({ user }) => {
  const { name } = useRouter().query;

  const { setUser } = useContext(Context);
  const [getTagDetails, { data, loading }] = useLazyQuery(searchTagQuery);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    (async () => {
      await getTagDetails({
        variables: {
          tag: name,
        },
      });
    })();
  }, []);

  return (
    <>
      <Head>
        <title>#{data?.searchTag?.name} on Hashnode</title>
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
            <ExploreTagIntro details={data?.searchTag} />
          </div>

          <div className={`right-menu hidden lg:inline`}>
            <TagRightMenu details={data?.searchTag} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTag;

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
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
