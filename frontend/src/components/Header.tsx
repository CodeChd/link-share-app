import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="p-5">
      <div
        id="header-content"
        className="flex items-center justify-between p-4 bg-white"
      >
        <img
          src="/images/logo-devlinks-large.svg"
          alt="logo"
          className="w-[10rem]"
        />

        <nav className="flex gap-4 items-center relative -translate-x-[15%]">
          <Link
            to="/"
            className={`px-4 text-mediumGrey p-3 font-bold rounded-lg ${
              pathname === "/" && "bg-lavender/30 text-royalBlue"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              fill="none"
              viewBox="0 0 21 20"
              className="inline-block mr-2 relative -top-[2px]"
            >
              <path
                fill={`${pathname === "/" ? "#633CFF" : "#737373"}`}
                d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z"
              />
            </svg>
            Links
          </Link>
          <Link
            to="/profile"
            className={`px-4 text-mediumGrey p-3 font-bold rounded-lg ${
              pathname === "/profile" && "bg-lavender/30 text-royalBlue"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              fill="none"
              viewBox="0 0 21 20"
              className="inline-block mr-2 relative -top-[2px]"
            >
              <path
                fill={`${pathname === "/profile" ? "#633CFF" : "#737373"}`}
                d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"
              />
            </svg>
            Profile Details
          </Link>
        </nav>

        <Link
          to="/preview/:publicId"
          className="p-2 px-4 rounded-lg border-royalBlue border-solid border text-royalBlue font-bold"
        >
          Preview
        </Link>
      </div>
    </header>
  );
};

export default Header;
