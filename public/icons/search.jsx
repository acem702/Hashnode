const Search = ({ w = 6, h = 6, ...rest }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      style={{ width: w, height: h }}
      fill="current"
    >
      <g clipPath="url(#clip0)">
        <path d="M186.804 176.609l-44.092-44.091a4.054 4.054 0 00-2.905-1.197h-3.521c11.724-12.68 18.902-29.599 18.902-48.227C155.188 43.82 123.366 12 84.094 12 44.82 12 13 43.821 13 83.094c0 39.272 31.821 71.094 71.094 71.094 18.628 0 35.547-7.178 48.227-18.868v3.487c0 1.093.445 2.119 1.197 2.905l44.091 44.092a4.107 4.107 0 005.811 0l3.384-3.384a4.107 4.107 0 000-5.811zM84.094 143.25c-33.257 0-60.156-26.899-60.156-60.156s26.899-60.156 60.156-60.156 60.156 26.899 60.156 60.156-26.899 60.156-60.156 60.156z"></path>
      </g>
      <defs>
        <clipPath>
          <path transform="translate(13 12)" d="M0 0h175v175H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Search;
