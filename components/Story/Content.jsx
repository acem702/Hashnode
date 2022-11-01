import MarkdownView from "react-showdown";
import { v4 as uuidv4 } from "uuid";

const Content = ({ content: data, tags }) => {
  return (
    <>
      <div className="single-post-content">
        <MarkdownView markdown={data} options={{ tables: true, emoji: true }} />

        <div className="my-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={uuidv4()}
              className="px-2 text-base py-1 rounded-md text-black dark:text-white hover:bg-gray-200 dark:border-gray-700 border border-gray-200 dark:hover:bg-gray-800"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Content;
