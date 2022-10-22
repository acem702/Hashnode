import { useContext, useEffect } from "react";
import Header from "components/Header";
import Posts from "components/Home/Posts";
import SideMenu from "components/common/SideMenu";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import { getPosts, GET_USER_STATUS } from "utils/helpers/gql/query";
import RightMenu from "components/common/RightMenu";

export default function Home({ data, user }) {
  const { setUser } = useContext(Context);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <>
      <div className="w-full bg-light-primary_background dark:bg-[#000]">
        <Header />

        <div
          className={`w-full xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full`}
        >
          <div className={`side-menu hidden lg:block`}>
            <SideMenu />
          </div>

          <div className="posts-body">
            <Posts posts={data.getPosts} />
          </div>

          <div className={`right-menu hidden lg:inline`}>
            <RightMenu />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
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

  const { data } = await client.query({
    query: getPosts,
    variables: {
      input: {
        limit: 20,
        skip: 0,
      },
    },
  });

  return {
    props: {
      data,
      user,
    },
  };
};
