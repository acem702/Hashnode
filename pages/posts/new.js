import React, { useState, useEffect, useContext, useCallback } from "react";
import NewPostHeader from "components/Header/NewPostHeader";
import Close from "public/icons/close";
import Upload from "public/icons/upload";
import { DEFAULT_ICON_SIZE, SECONDARY_ICON_SIZE } from "utils/constant";
import { handleChange, UploadImage } from "utils/helpers/miniFunctions";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { POST_QUERY, UPLOAD_QUERY } from "utils/helpers/gql/mutation";
import { getCookie } from "cookies-next";
import { Context } from "utils/context/main";
import { useRouter } from "next/router";
// import Editor from "components/Editor/Editor";
// import Preview from "components/Editor/Preview";
// import EditorHeader from "components/Editor/EditorHeader";
// import ReactMde from "react-mde";
// import * as Showdown from "showdown";
// import "react-mde/lib/styles/css/react-mde-all.css";

// const converter = new Showdown.Converter({
//   tables: true,
//   simplifiedAutoLink: true,
//   strikethrough: true,
//   tasklists: true,
// });

const New = () => {
  const router = useRouter();
  // const [value, setValue] = useState("**Hello world!!!**");
  const [preview, setPreview] = useState(false);
  const { setToast } = useContext(Context);
  const [publish, { data: publishData, loading }] = useMutation(POST_QUERY);
  const [value, setValue] = useState("**Hello world!!!**");

  const [uploadImage] = useMutation(UPLOAD_QUERY);

  const addTag = router.query;

  const [fileUploading, setFileUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({
    url: "",
    cloud_id: "",
  });

  const [subtitle, setSubtitle] = useState(false);
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    tags: addTag.tag,
    cover_image: {
      url: "",
      cloud_id: "",
    },
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, tags: addTag.tag }));
  }, [addTag]);

  useEffect(() => {
    if (publishData && publishData.createPost.success) {
      setToast({
        msg: "Post Created Successfully",
        status: true,
        type: "success",
      });
      router.push("/");
    }
  }, [publishData]);

  useEffect(() => {
    setData((prev) => ({ ...prev, cover_image: uploadedFile }));
  }, [uploadedFile]);

  useEffect(() => {
    if (publishData && publishData.createPost.success) {
      setToast({
        msg: "Post Uploaded Successfully!",
        status: true,
        type: "success",
      });
    }
  }, []);

  const publishPost = async () => {
    try {
      const token = getCookie("token");
      if (token) {
        await publish({
          variables: {
            input: {
              ...data,
              tags: data.tags
                .split(",")
                .map((e) => e.trim())
                .filter((e) => e !== ""),
              slug: data.title.toLowerCase().replaceAll(" ", "-").trim(),
              content: value,
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
          msg: "Login to write post",
          status: true,
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        msg: error.message || "Failed to create post",
        status: true,
        type: "error",
      });
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      const types = [
        "image/png",
        "image/webp",
        "image/jpg",
        "iamge/jpeg",
        "image/jfif",
      ];

      const fileType = e.target.files[0].type;

      if (!types.includes(fileType)) {
        return setToast({
          msg: "File Type unsuppported",
          status: true,
          type: "info",
        });
      }

      await UploadImage(
        e,
        uploadImage,
        setFileUploading,
        setUploadedFile,
        setToast
      );
    } catch (error) {
      console.log(error);
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
        <title>New Story - Hashnode</title>
      </Head>

      <div className="bg-light-primary_background dark:bg-dark-primary_background">
        <NewPostHeader loading={loading} publishPost={publishPost} />

        <div className="w-full px-4 lg:px-0 py-20 min-h-[calc(100vh-61px)]">
          <div className="w-full xl:max-w-[1000px] mx-auto">
            <header className="mb-4 flex items-center gap-4">
              <div className="dropdown">
                <div tabIndex={0}>
                  <button className="btn-secondary text-xl hover:border-gray-500 font-medium text-black dark:text-white">
                    Add cover
                  </button>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu px-2 py-2 bg-white dark:bg-[#000] border border-light-border_primary dark:border-dark-border_primary shadow-lg rounded-lg w-96 overflow-hidden"
                >
                  <header className="p-4 border-b border-dark-border_primary">
                    <div className="text-lg font-semibold flex items-center gap-2 text-black dark:text-white">
                      <Upload
                        w={SECONDARY_ICON_SIZE}
                        h={SECONDARY_ICON_SIZE}
                        className="fill-black dark:fill-white"
                      />
                      <span>{fileUploading ? "Uploading..." : "Upload"}</span>
                    </div>
                  </header>

                  <div className="my-6">
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e)}
                      id="cover_image"
                      hidden
                    />
                    <label htmlFor="cover_image">
                      <button className="mx-auto btn-primary rounded-lg w-max ">
                        Choose an Image
                      </button>
                    </label>
                  </div>
                  <p className="text-md text-center text-light-paragraph_color dark:text-dark-paragraph_color">
                    Recommended dimension is 1600 x 840
                  </p>
                </ul>
              </div>
              <button
                onClick={() => {
                  setSubtitle((prev) => !prev);
                }}
                className="btn-secondary text-xl font-medium text-black dark:text-white hover:border-gray-500"
              >
                Add Subtitle
              </button>
              {fileUploading && (
                <p className="text-light-paragraph_color dark:text-dark-paragraph_color font-semibold">
                  UPLOADING...
                </p>
              )}
            </header>

            {data.cover_image.url && (
              <div className="w-full h-[40rem]">
                <img
                  src={data.cover_image.url}
                  className="w-full h-full object-cover rounded-md"
                  alt="Cover Image not found!"
                />
              </div>
            )}

            <section className="py-8">
              <div>
                <input
                  type="text"
                  autoComplete={"off"}
                  value={data.title}
                  onChange={(e) => handleChange(e, data, setData)}
                  name="title"
                  placeholder="Article title..."
                  className="text-3xl lg:text-5xl font-semibold bg-transparent outline-none my-4 w-full text-black dark:text-white placeholder:text-[#222] dark:placeholder:text-[#ccc]"
                />

                <input
                  type="text"
                  autoComplete={"off"}
                  value={data.tags}
                  onChange={(e) => handleChange(e, data, setData)}
                  name="tags"
                  placeholder="Tags (Seperated by comma)"
                  className="text-xl lg:text-2xl font-medium bg-transparent outline-none my-4 w-full text-black dark:text-white placeholder:text-[#222] dark:placeholder:text-[#ccc]"
                />
              </div>

              {subtitle && (
                <div className="relative">
                  <input
                    type="text"
                    value={data.subtitle}
                    onChange={(e) => handleChange(e, data, setData)}
                    name="subtitle"
                    placeholder="Article subtitle..."
                    className="text-xl lg:text-2xl font-medium bg-transparent outline-none my-4 w-full text-black dark:text-white placeholder:text-[#222] dark:placeholder:text-[#ccc]"
                  />
                  <span
                    onClick={() => setSubtitle(false)}
                    className="px-4 py-3 cursor-pointer rounded-full absolute top-1/2 -translate-1/2 right-6 hover:bg-gray-200 dark:hover:bg-gray-700 block"
                  >
                    <Close
                      w={DEFAULT_ICON_SIZE}
                      h={DEFAULT_ICON_SIZE}
                      className="fill-black dark:fill-white"
                    />
                  </span>
                </div>
              )}
            </section>

            {/* <main className="create-story-container"> */}
            {/* <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
              />{" "} */}
            {/* <EditorHeader setPreview={setPreview} />
              {preview ? (
                <Preview doc={value} />
              ) : (
                <Editor
                  initialDoc={value}
                  onChange={(value) => {
                    setValue(value);
                  }}
                />
              )}
            </main> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
