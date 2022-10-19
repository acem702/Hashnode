const TagRightMenu = ({ details }) => {
  return (
    <div className="flex flex-col gap-spacing">
      <div className="card p-6">
        <h1 className="text-xl mb-4 font-semibold text-white dark:text-heading_color">
          About this tag
        </h1>
        <p className="text-light-paragraph_color dark:text-dark-paragraph_color text-md">
          {details?.description}
        </p>
      </div>
      <div className="card p-6"></div>
    </div>
  );
};

export default TagRightMenu;
