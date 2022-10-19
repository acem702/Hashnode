import { useState } from "react";

import NewPostHeader from "components/Header/NewPostHeader";
import Close from "public/icons/close";
import Upload from "public/icons/upload";
import { DEFAULT_ICON_SIZE, SECONDARY_ICON_SIZE } from "utils/constant";
import { handleChange } from "utils/helpers/miniFunctions";

const New = () => {
  const [subtitle, setSubtitle] = useState(false);
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    cover_image: {
      url: "",
      public_id: "",
    },
    content: "",
  });

  return (
    <div>
      <NewPostHeader />

      <div className="w-full">
        <div className="w-full xl:max-w-[1000px] mx-auto">
          <header className="mb-4 flex items-center gap-4">
            <div className="dropdown">
              <div tabIndex={0}>
                <button className="btn-secondary text-xl font-medium text-black dark:text-white">
                  Add cover
                </button>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu px-2 py-2 bg-white dark:bg-black border border-light-border_primary dark:border-dark-border_primary shadow-lg rounded-lg w-96 overflow-hidden"
              >
                <header className="p-4 border-b border-dark-border_primary">
                  <div className="text-lg font-semibold flex items-center gap-2">
                    <Upload
                      w={SECONDARY_ICON_SIZE}
                      h={SECONDARY_ICON_SIZE}
                      className="fill-white"
                    />
                    <span>Upload</span>
                  </div>
                </header>
                <div className="my-6">
                  <input
                    type="file"
                    accept="image/png, image/webp, image/jpg , iamge/jpeg , image/jfif"
                    id="cover_image"
                    hidden
                  />
                  <button className="mx-auto btn-primary rounded-lg w-max">
                    <label htmlFor="cover_image">Choose an Image</label>
                  </button>
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
              className="btn-secondary text-xl font-medium text-black dark:text-white"
            >
              Add Subtitle
            </button>
          </header>

          <section className="py-8">
            <div>
              <input
                type="text"
                value={data.title}
                onChange={(e) => handleChange(e, data, setData)}
                name="title"
                placeholder="Article title..."
                className="text-5xl font-semibold bg-transparent outline-none my-4 w-full"
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
                  className="text-2xl font-medium bg-transparent outline-none my-4 w-full"
                />
                <span
                  onClick={() => setSubtitle(false)}
                  className="px-4 py-3 cursor-pointer rounded-full absolute top-1/2 -translate-1/2 right-6 hover:bg-gray-700 block"
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

          <main>
            {/* <TextEditor
              onChange={(e) => {
                console.log(e.target?.innerHTML);
              }}
            /> */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default New;
