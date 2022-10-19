import Card from "components/common/Card";
import { v4 as uuidv4 } from "uuid";

const Posts = ({ posts }) => {
  return (
    <div className="w-full flex flex-col gap-spacing">
      <div className="w-full overflow-hidden px-4 py-6 card mb-0">
        <header className="w-max flex items-center gap-spacing">
          {Array(15)
            .fill(null)
            .map(() => (
              <div
                key={uuidv4()}
                className="rounded-full w-14 h-14 cursor-pointer bg-gray-700"
              ></div>
            ))}
        </header>
      </div>
      <main className="card p-4">
        {posts.map((post) => (
          <Card key={uuidv4()} details={post} />
        ))}
      </main>
    </div>
  );
};

export default Posts;
