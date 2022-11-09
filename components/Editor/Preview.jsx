import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "github-markdown-css/github-markdown.css";
import ReactMarkdown from "react-markdown";
import CopyBtn from "./CopyBtn";

const Preview = (props) => {
  return (
    <div className="preview markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ node, ...props }) {
            return <pre {...props} />;
          },
          code({ node, inline, className, children, style, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CopyBtn codeText={String(children)}>
                <SyntaxHighlighter
                  style={prism}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </CopyBtn>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {props.doc}
      </ReactMarkdown>
    </div>
  );
};

export default Preview;
