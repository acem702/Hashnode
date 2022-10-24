const Basic = ({ allfields, details, submit, loading }) => {
  return (
    <div className="w-full md:w-[calc(100%/2-16px)]">
      <h1 className="text-2xl font-semibold text-black dark:text-dark-heading_color">
        Basic Info
      </h1>

      {allfields.basic.map((field) => {
        return (
          <div className="my-4" key={field._id}>
            <label
              htmlFor={field._id}
              className="block mb-1 text-light-paragraph_color dark:text-dark-paragraph_color"
            >
              {field.label}
            </label>
            {field.type === "INPUT" ? (
              <input
                type="text"
                id={field._id}
                name={field.name}
                placeholder={field.placeholder}
                value={details[field.name] || ""}
                disabled={field.disabled || false}
                onChange={field.onChange}
                data-isnested={field.path}
                className={`input ${
                  field.disabled
                    ? "text-light-paragraph_color dark:text-dark-paragraph_color"
                    : ""
                }`}
              />
            ) : field.type === "TEXTAREA" ? (
              <textarea
                id={field._id}
                name={field.name}
                value={details[field.name] || ""}
                placeholder={field.placeholder}
                onChange={field.onChange}
                className="textarea"
                data-isnested={field.path}
              />
            ) : (
              <>
                <input type="file" id={field._id} hidden />
                <label
                  htmlFor={field._id}
                  className="rounded-full w-44 h-44 flex items-center justify-center bg-light-border_primary dark:bg-dark-border_primary border border-light-border_primary text-light-paragraph_color dark:text-dark-paragraph_color font-semibold dark:border-dark-border_secondary"
                >
                  <div className="">Upload Profile</div>
                </label>
              </>
            )}
          </div>
        );
      })}

      <h1 className="text-2xl mt-10 font-semibold text-black dark:text-dark-heading_color">
        About you
      </h1>
      {allfields.about.map((field) => {
        return (
          <div className="my-4" key={field._id}>
            <label htmlFor={field._id} className="block mb-1">
              {field.label}
            </label>
            {field.type === "INPUT" ? (
              <input
                id={field._id}
                type="text"
                value={
                  field.path
                    ? details[field.path][field.name] || ""
                    : details[field.name] || ""
                }
                name={field.name}
                placeholder={field.placeholder}
                className="input"
                onChange={field.onChange}
                data-isnested={field.path}
              />
            ) : (
              field.type === "TEXTAREA" && (
                <textarea
                  id={field._id}
                  value={
                    field.path
                      ? details[field.path][field.name]
                      : details[field.name] || ""
                  }
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                  className="textarea"
                  data-isnested={field.path}
                />
              )
            )}
          </div>
        );
      })}

      <button
        disabled={loading}
        onClick={submit}
        className={`btn-tertiary rounded-full ${
          loading ? "cursor-not-allowed opacity-25" : ""
        }`}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default Basic;
