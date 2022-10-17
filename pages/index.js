import Header from "components/Header";
import Posts from "components/Home/Posts";
import SideMenu from "components/Home/SideMenu";
import client from "utils/helpers/config/apollo-client";
import { getPosts } from "utils/helpers/gql/query";
// flex-[1.38]
// flex-[5]
// flex-[2]
export default function Home({ data }) {
  return (
    <>
      <div className="w-full dark:bg-black">
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
            <div className="w-full h-full">
              <div className="rounded-md w-full bg-white dark:bg-dark-primary_background border border-text-dark-200 dark:border-dark-border_primary p-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-text-light-400 dark:text-dark-heading_color tracking-wider">
                    Trending
                  </h1>
                  <button className="btn-secondary text-text-light-400 font-semibold dark:text-dark-paragraph_color">
                    See all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  // connect();
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
    },
  };
};
