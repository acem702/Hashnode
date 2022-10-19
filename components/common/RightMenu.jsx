const RightMenu = () => {
  return (
    <div className="w-full h-full">
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black dark:text-dark-heading_color">
            Trending
          </h1>
          <button className="btn-secondary text-light-paragraph_color font-semibold dark:text-dark-paragraph_color">
            See all
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightMenu;
