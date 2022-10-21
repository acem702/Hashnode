import RightMenu from "components/common/RightMenu";
import SideMenu from "components/common/SideMenu";
import Header from "components/Header";
import React from "react";
import client from "utils/helpers/config/apollo-client";
import { GET_USER_STATUS } from "utils/helpers/gql/query";

const Bookmarks = ({ user }) => {
  return (
    <>
      <div className="w-full bg-light-primary_background dark:bg-black">
        <Header />

        <div
          className={`w-full xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full`}
        >
          <div className={`side-menu hidden lg:block`}>
            <SideMenu />
          </div>

          <div className="posts-body">Hello world!</div>

          <div className={`right-menu hidden lg:inline`}>
            <RightMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmarks;

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

  return {
    props: {
      user,
    },
  };
};
