import { LinkType } from "../context/linkSlice";
import { platformColorMap } from "../data/platformColorMap";
import { platformCustomIconMap } from "../data/platformCustomIconMap";

interface MobileSvgProps {
  linkItems: LinkType[];
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  loadingUser: boolean;
  loadingLinks: boolean;
}

const MobileSvg = ({
  linkItems,
  firstName,
  lastName,
  image,
  email,
  loadingUser,
  loadingLinks,
}: MobileSvgProps) => {
  return (
    <div
      className="bg-white p-[5rem] flex justify-center rounded-lg max-laptop:hidden "
      style={{ height: "calc(800px)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="305"
        height="630"
        fill="none"
        viewBox="0 0 308 632"
      >
        <path
          stroke="#737373"
          d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
        />
        <path
          fill="#fff"
          stroke="#737373"
          d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
        />

        {!image ? (
          <circle cx="153.5" cy="112" r="48" fill="#EEE" />
        ) : (
          <svg>
            <defs>
              <pattern id="image" x="0" y="0" height="1" width="1">
                <image
                  preserveAspectRatio="xMidYMid slice"
                  x="0"
                  y="0"
                  href={image as string}
                  height="100"
                  width="100"
                />
              </pattern>
              z
            </defs>
            <circle
              stroke="#633CFF"
              strokeWidth="4"
              cx="153"
              cy="112"
              r="48"
              fill="url(#image)"
            />
          </svg>
        )}

        {firstName || lastName ? (
          <foreignObject width="100%" height="25" x="0" y="180" rx="4">
            <p
              aria-label="first-name"
              className="text-xl font-bold text-richBlack text-center"
            >
              {firstName}&nbsp;{lastName}
            </p>
          </foreignObject>
        ) : (
          <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
        )}
        <foreignObject width="100%" height="25" x="0" y="214" rx="4">
          <p
            aria-label="user email"
            className="text-b-m text-center text-mediumGrey"
          >
            {loadingUser ? "Loading" : email}
          </p>
        </foreignObject>

        {loadingLinks ? (
          "Loading"
        ) : (
          <foreignObject
            height="300"
            rx="4"
            x="-5"
            y="270"
            id="phone-container"
            className={`${
              linkItems.length > 5
                ? "w-[20.20rem] desktop:w-[20.90rem]"
                : "w-[20rem]"
            } overflow-y-auto`}
          >
            <div className="flex flex-col gap-[0.8rem] relative">
              {linkItems.map((x) => (
                <a
                  key={x._id}
                  href={x.link}
                  target="_blank"
                  className="cursor-pointer grid grid-cols-[auto_1fr_auto] gap-2 px-4 mx-8 h-[44px] rounded-md overflow-hidden items-center text-left drop-shadow-md"
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
          </foreignObject>
        )}
      </svg>
    </div>
  );
};

export default MobileSvg;
