import Card from "components/common/Card";
import React from "react";

const Posts = ({ posts }) => {
  return (
    <div className="w-full flex flex-col gap-spacing">
      <div className="w-full overflow-hidden px-4 py-6 dark:bg-dark-primary_background bg-white border border-text-dark-200 dark:border-dark-border_primary rounded-md">
        <header className="w-max flex items-center gap-spacing">
          {Array(15)
            .fill(null)
            .map(() => (
              <div className="rounded-full w-14 h-14 cursor-pointer bg-gray-700"></div>
            ))}
        </header>
      </div>
      <main className="dark:bg-dark-primary_background w-full h-full p-4 rounded-md border dark:border-dark-border_primary">
        {posts.map((post) => (
          <Card details={post} />
        ))}
      </main>
    </div>
  );
};

export default Posts;
