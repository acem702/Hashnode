import { useContext, useEffect, useState } from "react";
import client from "utils/helpers/config/apollo-client";
import { getSinglePostBySlug, GET_USER_STATUS } from "utils/helpers/gql/query";
import { Context } from "utils/context/main";
import Image from "next/image";
import { getDate, readingTime } from "utils/helpers/miniFunctions";
import { useMutation } from "@apollo/client";
import { getCookie } from "cookies-next";
import LikeBar from "components/Story/LikeBar";
import Content from "components/Story/Content";
import PostComment from "components/Story/PostComment";
import SinglePostHeader from "components/Header/SinglePostHeader";
import Head from "next/head";
import { LIKE_POST } from "utils/helpers/gql/mutation";

const SinglePost = ({ user, data }) => {
  const [likeData, setLikeData] = useState(data.data);
  const [LikePost, { data: likeResponse, error }] = useMutation(LIKE_POST);
  const { setUser, setToast } = useContext(Context);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    setToast({
      msg: error,
    });
  }, [error]);

  useEffect(() => {
    if (likeResponse) {
      if (likeResponse.likePost.success) {
        setToast({
          msg: likeResponse.likePost.message,
          status: true,
          type: "success",
        });
        setLikeData({ likes: likeResponse.likePost.updated });
      } else {
        setToast({
          msg: likeResponse.likePost.message,
          status: true,
          type: "error",
        });
        setLikeData({ likes: likeResponse.likePost.updated });
      }
    }
  }, [likeResponse]);

  const likePost = async (e) => {
    try {
      const token = getCookie("token");

      if (token) {
        await LikePost({
          variables: {
            input: {
              post: data.data._id,
              like: e,
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
      } else {
        setToast({
          msg: "Login to like",
          status: true,
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        msg: error.message,
        status: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <Head>
        <title>{data?.data?.title} - Hashnode</title>
      </Head>

      <div className="w-full min-h-screen bg-light-primary_background dark:bg-dark-primary_background">
        <SinglePostHeader details={data.data.user} user={user} />

        <div
          className={`w-full xl:container mx-auto px-2 py-10 min-h-[calc(100vh-76px)] h-full`}
        >
          {data.data.cover_image.url && (
            <img
              src={data.data.cover_image.url}
              alt=""
              className="object-cover w-full h-[60vw] md:w-11/12 lg:w-9/12 lg:h-[37rem] mx-auto mb-20"
            />
          )}

          <h1 className="text-center text-4xl md:text-4xl lg:text-4xl xl:text-5xl text-black dark:text-white font-bold mb-6">
            {data.data.title}
          </h1>

          {data.data.subtitle && (
            <p className="text-light-paragraph_color text-center dark:text-dark-paragraph_color font-medium text-3xl mb-8">
              {data.data.subtitle}
            </p>
          )}

          <div className="flex items-center justify-center mb-10 text-light-paragraph_color dark:text-dark-paragraph_color">
            <div className="flex items-center gap-4">
              <Image
                width={60}
                height={60}
                src={data.data.user.profile_photo.url}
                className="rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">{data.data.user.name}</h3>
            </div>
            <span className="mx-2">·</span>
            <h3 className="text-xl font-semibold">
              {getDate(data.data.createdAt)}
            </h3>
            <span className="mx-2">·</span>
            <h3 className="text-xl font-semibold">
              {readingTime(data.data.content)} min read
            </h3>
          </div>

          <div className="single-post-grid">
            <Content content={data.data.content} tags={data.data.tags} />

            <LikeBar
              details={data.data}
              likeData={likeData}
              user={user}
              likePost={likePost}
              commentsCount={data.data.commentsCount}
            />
          </div>

          <PostComment data={data.data} />
        </div>
      </div>
    </>
  );
};

export default SinglePost;

export const getServerSideProps = async (ctx) => {
  const { username, slug } = ctx.query;

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
    query: getSinglePostBySlug,
    variables: {
      input: {
        slug,
        user: username,
      },
    },
  });


  if (data.getPostBySlug.success) {
    return {
      props: {
        user,
        data: data.getPostBySlug,
      },
    };
  } else {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }
};
