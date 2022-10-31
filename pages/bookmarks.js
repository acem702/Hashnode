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
import Head from "next/head";
import SearchSection from "components/common/SearchSection";

const Bookmarks = ({ user }) => {
  const { setUser, searchState } = useContext(Context);
  const [getPosts, { data, loading, error }] = useLazyQuery(GET_BOOKMARKS);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    (async () => {
      const tags = JSON.parse(localStorage.getItem("bookmarks")) || [];
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
      <Head>
        <title>Bookmarks - Hashnode</title>
      </Head>

      <Header />
      {searchState ? (
        <div className="w-full xl:container mx-auto min-h-[calc(100vh-76px)] h-full">
          <SearchSection />
        </div>
      ) : (
        <div className="w-full bg-light-primary_background dark:bg-[#000] py-spacing">
          <div className="w-full xl:container mx-auto px-2 posts-grid min-h-[calc(100vh-76px)] h-full">
            <div className="side-menu hidden lg:block">
              <SideMenu />
            </div>

            <div className="posts-body">
              <div className="card p-0 mb-0">
                {loading ? (
                  <>
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                  </>
                ) : (
                  data?.getManyPosts.map((e) => <Card details={e} />)
                )}

                {(data?.getManyPosts.length === 0 ||
                  data?.getManyPosts === undefined) && (
                  <div className="w-full py-4 text-center text-light-paragraph_color dark:text-dark-paragraph_color">
                    No Bookmarks found
                  </div>
                )}
                {!loading && data?.getManyPosts.length > 0 && <End />}
              </div>
            </div>

            <div className="right-menu hidden lg:inline">
              <RightMenu />
            </div>
          </div>
        </div>
      )}
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
