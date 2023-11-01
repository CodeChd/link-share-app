import { Link } from "react-router-dom";
import { useGetLinksQuery, useGetUserProfileQuery } from "../context/apiSlice";
import { useEffect, useState } from "react";
import { LINKS_URL } from "../constants";
import { platformColorMap } from "../data/platformColorMap";
import { LinkType } from "../context/linkSlice";
import { platformCustomIconMap } from "../data/platformCustomIconMap";

const Preview = () => {
  const { data, isLoading: loadingLinks } = useGetLinksQuery(LINKS_URL);

  const { data: userFullName, isLoading: loadingUser } =
    useGetUserProfileQuery("info");

  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string | null>("");

  useEffect(() => {
    if (!loadingUser) {
      setFname(userFullName.firstName);
      setLname(userFullName.lastName);
      setEmail(userFullName.email);
      setImage(userFullName.image);
      const storedImage = localStorage.getItem("image");
      if (!userFullName.image || storedImage) {
        setImage(storedImage);
      }
    }
  }, [userFullName, loadingUser]);

  return (
    <>
      <div className="bg-royalBlue h-[25rem] w-full p-4 rounded-bl-[3rem] rounded-br-[3rem]">
        <div className="bg-white p-2 rounded-lg w-full">
          <nav className=" p-2  w-full flex justify-between">
            <Link
              to="/"
              className="p-3 px-8 hover:bg-babyPowder/50 text-center font-bold rounded-md border-royalBlue text-royalBlue border-solid  border "
            >
              Back to Editor
            </Link>
            <button className="rounded-md p-2 px-8 text-white bg-royalBlue hover:bg-lavender font-bold ">
              Share Link
            </button>
          </nav>
        </div>
      </div>

      <div className="rounded-xl mx-auto w-full h-full max-w-[350px] drop-shadow-lg bg-white -mt-[8rem] p-8 flex flex-col items-center justify-center gap-4">
        {!image ? (
          <svg>
            <circle
              cx="153"
              cy="75"
              r="70"
              fill="#EEE"
              stroke="#633CFF"
              strokeWidth="4"
            />
          </svg>
        ) : (
          <div className="aspect-square  overflow-hidden h-48 w-48">
            <img
              draggable={false}
              src={image}
              alt="profile-image"
              className="object-cover rounded-full border-solid border-4 border-royalBlue w-full h-full"
            />
          </div>
        )}

        <div className="mb-4">
          {fname || lname ? (
            <h1 className=" text-center text-mediumGrey">
              <p
                aria-label="first-name"
                className="text-h-m-b font-bold text-richBlack text-center"
              >
                {fname}&nbsp;{lname}
              </p>
            </h1>
          ) : (
            <h1 className="text-h-m-b text-center text-richBlack font-bold my-2">
              <em>your name</em>
            </h1>
          )}
          <h2
            aria-label="user email"
            className="text-b-m text-center text-mediumGrey"
          >
            {email}
          </h2>
        </div>

        <div>
          {loadingLinks ? (
            "Loading"
          ) : (
            <div id="phone-container" className="w-[20rem] desktop:w-[17vw]">
              <div className="flex flex-col gap-[0.8rem] relative w-full">
                {data?.linkItems.map((x: LinkType) => (
                  <a
                    key={x._id}
                    href={x.link || ""}
                    target="_blank"
                    className="cursor-pointer grid grid-cols-[auto_1fr_auto] gap-2 px-4 mx-8 h-[3.5rem] rounded-md overflow-hidden items-center text-h-s-b text-left drop-shadow-md"
                    style={{
                      backgroundColor: !x.name
                        ? "#EEE"
                        : platformColorMap[x.name],
                    }}
                  >
                    <img src={platformCustomIconMap[x.name]} alt={x.name} />
                    <p
                      className={
                        x.name === "Frontend Mentor" || !x.name
                          ? "text-richBlack"
                          : "text-white"
                      }
                    >
                      {x.name}
                    </p>
                    {x.name && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill={
                            x.name === "Frontend Mentor" ? "#333333" : "#fff"
                          }
                          d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
                        />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Preview;
