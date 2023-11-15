import { ChangeEvent, useState } from "react";
import platforms from "../data/platforms";
import { PlatformType } from "../data/platforms";
import { LinkType, addLink, removeLink } from "../context/linkSlice";
import { useDispatch } from "react-redux";
import { isValidUrl } from "../utils/isValidUrl";

const Links = ({
  data,
  platformError,
  linkError,
  attributes,
  listeners,
  setNodeRef,
  style,
}: {
  platformError: boolean;
  linkError: boolean;
  data: LinkType;
  attributes: any;
  listeners: any;
  setNodeRef: any;
  style: any;
}) => {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const PlatformHandler = (platform: PlatformType) => {
    setIsClicked(!isClicked);
    //Update platform with link id
    dispatch(addLink({ ...platform, id: data.id, link: "" }));
  };

  const UpdateLinkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedLink = e.target.value;
    // Update link with link id
    dispatch(addLink({ ...data, id: data.id, link: updatedLink }));
  };

  const DeleteLink = () => {
    dispatch(removeLink(data.id));
  };

  const IsClicked = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={style}
      aria-label="Card-link"
      className="w-full h-[14.5rem] bg-lightGrey/20 p-4 rounded-lg relative"
    >
      <div className="flex justify-between cursor-default">
        <p className="text-mediumGrey text-h-s-b font-bold">
          <span
            {...listeners}
            className="cursor-pointer inline-block mr-3 px-2"
          >
            <img
              src="/images/icon-drag-and-drop.svg"
              alt="Hold to drag this link"
              className="object-cover w-4"
            />
          </span>
          Link #{data.id}
        </p>
        <button
          onClick={DeleteLink}
          className="bg-transparent text-mediumGrey text-b-m"
        >
          Remove
        </button>
      </div>


      <div className="mt-4 cursor-default relative">
        <p className="text-b-s block">Platform</p>

        <div
          className={`relative p-4 rounded-md overflow-hidden bg-white mt-1 ${
            !data.name && platformError && "border-crimson border-solid border"
          } ${isClicked && "border-none"}`}
        >
          <legend className="absolute top-2 text-mediumGrey text-b-m ">
            {data.name && data.image ? (
              <button className="flex gap-4 w-full">
                <img
                  src={data.image}
                  alt={data.name}
                  width="18"
                  className="mt-1"
                />
                <p className="text-richBlack">{data.name}</p>
              </button>
            ) : (
              "Select Platform"
            )}
          </legend>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="9"
            fill="none"
            viewBox="0 0 14 9"
            className={`ms-auto ${isClicked ? "rotate-180" : ""}`}
          >
            <path
              stroke={
                !data.name && platformError && !isClicked
                  ? "#FF3939"
                  : "#633CFF"
              }
              strokeWidth="2"
              d="m1 1 6 6 6-6"
            />
          </svg>

          <button
            className={`absolute inset-0 p-2 w-full overflow-hidden rounded-md ${
              isClicked && "border border-solid  border-royalBlue "
            }`}
            onClick={IsClicked}
          ></button>
        </div>

        {isClicked && (
          <ul className="absolute w-full z-10 rounded-md h-48 overflow-y-auto drop-shadow-lg mt-2">
            {platforms.map((platform) => (
              <li key={platform.id}>
                <button
                  onClick={() => PlatformHandler(platform)}
                  className="flex gap-4 bg-white w-full p-2 py-5"
                >
                  <img
                    src={platform.image}
                    alt={platform.name}
                    width="25"
                    height="25"
                  />
                  <p className="text-richBlack">{platform.name}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="text-b-s mt-4 mb-1 block">Link</p>

        <input
          name="link"
          type="text"
          value={data.link}
          onChange={UpdateLinkHandler}
          placeholder="e.g.https://www.github.com/CodeChd"
          className={`mt-1 w-full bg-link bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue focus:drop-shadow-input placeholder:text-mediumGrey/90  ${
            linkError && data.link.length === 0 && "border-crimson/40"
          }    ${linkError && !isValidUrl(data.link) && "border-crimson/40"}`}
        />
        {linkError && data.link.length === 0 && (
          <span className="absolute right-5 bottom-14  text-crimson inline-block">
            Can't be empty
          </span>
        )}

        {linkError && !isValidUrl(data.link) && data.link.length > 0 && (
          <span className="absolute right-5 bottom-14   text-crimson inline-block">
            Please check the URL
          </span>
        )}
      </div>
    </div>
  );
};

export default Links;
