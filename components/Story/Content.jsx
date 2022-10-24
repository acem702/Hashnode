import MarkdownView from "react-showdown";

const Content = ({ content: data }) => {
  return (
    <div className="single-post-content">
      <MarkdownView markdown={data} options={{ tables: true, emoji: true }} />
    </div>
  );
};

export default Content;
