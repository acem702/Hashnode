import React from "react";

const EditorHeader = ({ setPreview }) => {
  return (
    <div className="flex items-center rounded-md mb-2 p-2 border border-light-border_primary dark:border-dark-border_secondary">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setPreview(false)}
          className="px-4 py-2 dark:hover:bg-dark-border_secondary rounded-md border border-light-border_primary dark:border-dark-border_secondary "
        >
          Write
        </button>
        <button
          onClick={() => setPreview(true)}
          className="px-4 py-2 dark:hover:bg-dark-border_secondary rounded-md border border-light-border_primary dark:border-dark-border_secondary "
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
