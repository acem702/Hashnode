import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "cookies-next";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "components/Header";
import Head from "next/head";
import Basic from "components/Settings/Basic";
import Social from "components/Settings/Social";
import { Context } from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import { GET_USER, UPDATE_USER } from "utils/helpers/gql/query";
import { handleChange, isValidHttpUrl } from "utils/helpers/miniFunctions";

const Account = ({ user }) => {
  const { setUser, setToast } = useContext(Context);
  const { _id, followers, following, createdAt, ...rest } = user;
  const [details, setDetails] = useState(rest);
  const [updateUserMutation, { data, loading, error }] =
    useMutation(UPDATE_USER);

  const [allfields] = useState({
    basic: [
      {
        _id: uuidv4(),
        label: "Full Name",
        name: "name",
        type: "INPUT",
        placeholder: "Enter your full name",
        path: null,
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Username",
        type: "INPUT",
        name: "username",
        placeholder: "Enter your username",
        path: null,
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Email",
        type: "INPUT",
        name: "email",
        disabled: true,
        placeholder: "Email address",
        path: null,
      },
      {
        _id: uuidv4(),
        label: "Profile Tagline",
        type: "INPUT",
        name: "tagline",
        placeholder: "Software Developer @...",
        path: null,
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Profile Photo",
        type: "PHOTO",
        path: null,
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Location",
        type: "INPUT",
        placeholder: "London, UK",
        path: null,
        name: "location",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
    ],

    about: [
      {
        _id: uuidv4(),
        label: "Profile Bio (About you)",
        type: "TEXTAREA",
        name: "about",
        placeholder: "I am a developer from …",
        path: "bio",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Tech Stack",
        type: "INPUT",
        name: "skills",
        placeholder: "Search technologies, topics, more…",
        path: null,
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Available for",
        type: "TEXTAREA",
        name: "available",
        placeholder: "I am available for mentoring, …",
        path: "bio",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
    ],

    social: [
      {
        _id: uuidv4(),
        label: "Twitter Profile",
        type: "INPUT",
        placeholder: "https://twitter.com/johndoe",
        path: "social",
        name: "twitter",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Instagram Profile",
        type: "INPUT",
        placeholder: "https://instagram.com/johndoe",
        name: "instagram",
        path: "social",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "GitHub Profile",
        type: "INPUT",
        path: "social",
        placeholder: "https://github.com/hashnode",
        name: "github",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "StackOverflow Profile",
        type: "INPUT",
        placeholder: "https://stackoverflow.com/users/22656/jon-skeet",
        name: "stackoverflow",
        path: "social",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Facebook Profile",
        type: "INPUT",
        placeholder: "Enter https://facebook.com/johndoe",
        name: "facebook",
        path: "social",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "Website URL",
        type: "INPUT",
        placeholder: "https://johndoe.com",
        name: "website",
        path: "social",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "LinkedIn URL",
        type: "INPUT",
        placeholder: "https://www.linkedin.com/in/johndoe",
        name: "linkedin",
        path: "social",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
      {
        _id: uuidv4(),
        label: "YouTube Channel",
        type: "INPUT",
        placeholder: "https://www.youtube.com/channel/channel-name",
        name: "youtube",
        path: "social",
        onChange: (e) => {
          handleChange(e, details, setDetails);
        },
      },
    ],
  });

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    console.log(data);
    if (data && data.updateUser && data.updateUser.success) {
      setToast({
        msg: "User Updated successfully!",
        type: "success",
        status: true,
      });
    }
  }, [data]);

  const submit = async () => {
    try {
      const token = getCookie("token");

      const { email, ...d } = details;

      const links = d.social;

      for (let i = 0; i < Object.entries(links).length; i++) {
        const url = links[Object.entries(links)[i][0]];

        if (url !== null) {
          if (!isValidHttpUrl(url))
            return setToast({
              msg: `Invalid URL in ${Object.keys(links)[i]}`,
              status: true,
              type: "info",
            });
        }
      }

      const updatedData = {
        ...d,
        skills: Array.isArray(details.skills)
          ? details.skills
          : details.skills.split(",").map((e) => e.trim()),
        tagline: Array.isArray(details.tagline)
          ? details.tagline
          : details.tagline.split(",").map((e) => e.trim()),
      };

      await updateUserMutation({
        variables: {
          input: updatedData,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
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
      <title>Account Settings - Hashnode </title>
    </Head>
      <div className="w-full bg-light-primary_background dark:bg-[#000]">
        <Header />

        <div
          className={`w-full xl:container mx-auto px-2 flex flex-col lg:flex-row gap-spacing min-h-[calc(100vh-76px)] h-full`}
        >
          <div
            className={`flex-shrink-0 w-full lg:w-80 lg:pl-0 lg:pr-4 flex flex-col gap-spacing`}
          >
            <div className="card p-4">
              <h1 className="text-2xl font-semibold text-light-paragraph_color dark:text-dark-paragraph_color">
                User Settings
              </h1>
            </div>

            <div className="card py-2">
              <ul>
                <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:dark:bg-dark-border_secondary ">
                  PROFILE
                </li>
                <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:dark:bg-dark-border_secondary ">
                  EMAIL NOTIFICATIONS
                </li>
                <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:dark:bg-dark-border_secondary ">
                  MANAGE BLOGS
                </li>
                <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:dark:bg-dark-border_secondary ">
                  DEVELOPER
                </li>
                <li className="font-semibold py-3 cursor-pointer px-4 text-lg hover:dark:bg-dark-border_secondary ">
                  ACCOUNT
                </li>
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <div className="card flex-row flex-wrap gap-xlspacing p-6">
              <Basic
                loading={loading}
                allfields={allfields}
                details={details}
                submit={submit}
              />

              <Social allfields={allfields} details={details} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;

export const getServerSideProps = async (ctx) => {
  let user = null;
  const token = ctx.req.cookies.token;

  if (token) {
    const {
      data: { getUser: data },
    } = await client.query({
      query: GET_USER,
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
