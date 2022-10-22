import RightMenu from "components/common/RightMenu";
import SideMenu from "components/common/SideMenu";
import Header from "components/Header";
import React, { useEffect, useContext } from "react";
import client from "utils/helpers/config/apollo-client";
import { GET_BOOKMARKS, GET_USER_STATUS } from "utils/helpers/gql/query";
import { useLazyQuery } from "@apollo/client";
import Card from "components/common/Card";
import End from "components/common/End";
import { Context } from "utils/context/main";
import CardLoading from "components/common/loadings/cardLoading";

const Bookmarks = ({ user }) => {
  const { setUser } = useContext(Context);
  const [getPosts, { data, loading, error }] = useLazyQuery(GET_BOOKMARKS);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    (async () => {
      const tags = JSON.parse(localStorage.getItem("bookmarks"));
      if (tags.length > 0) {
        await getPosts({
          variables: {
            ids: tags,
          },
        });
      }
    })();
  }, []);

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
            <div className="card p-0 mb-0">
              {!loading ? (
                <>
                  <CardLoading />
                  <CardLoading />
                  <CardLoading />
                  <CardLoading />
                </>
              ) : (
                data?.getManyPosts.map((e) => <Card details={e} />)
              )}
              {!loading && <End />}
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
