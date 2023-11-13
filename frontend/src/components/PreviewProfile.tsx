import { LinkType } from "../context/linkSlice";
import { platformColorMap } from "../data/platformColorMap";
import { platformCustomIconMap } from "../data/platformCustomIconMap";

interface PreviewProps {
  linkItems: LinkType[];
  firstName?: string;
  lastName?: string;
  image: string;
  email: string;
  loadingLinks?: boolean;
  loadingProfile?: boolean;
  fullName?: string;
}

const PreviewProfile = ({
  linkItems,
  firstName,
  lastName,
  fullName,
  image,
  email,
  loadingLinks,
  loadingProfile,
}: PreviewProps) => {
  return (
    <div className="rounded-xl mx-auto w-full h-full max-w-[350px] drop-shadow-lg tablet:bg-white -mt-[8rem] p-8 flex flex-col items-center justify-center gap-4">
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
        {firstName || lastName || fullName ? (
          <h1 className=" text-center text-mediumGrey">
            <p
              aria-label="first-name"
              className="text-h-m-b font-bold text-richBlack text-center"
            >
              {fullName ? fullName : `${firstName} ${lastName}`}
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
        {loadingProfile ? (
          loadingProfile
        ) : loadingLinks ? (
          "Loading"
        ) : (
          <div id="phone-container" className="w-[20rem] desktop:w-[17vw]">
            <div className="flex flex-col gap-[0.8rem] relative w-full">
              {linkItems.map((x: LinkType) => (
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
                        fill={x.name === "Frontend Mentor" ? "#333333" : "#fff"}
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
  );
};

export default PreviewProfile;
